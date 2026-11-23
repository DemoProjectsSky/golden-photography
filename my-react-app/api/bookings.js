import nodemailer from "nodemailer";

// ---- limits & helpers -------------------------------------------------------
const LIMITS = { name: 80, email: 120, phone: 20, type: 60, date: 10, message: 2000 };
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map(); // best-effort, per warm serverless instance (not a substitute for a WAF)

/* eslint-disable no-control-regex -- stripping control characters is the point of these helpers */
// Removes control characters (incl. CR/LF, which enable email header injection) and trims.
const clean = (v, max) =>
  String(v ?? "")
    .replace(/[\u0000-\u001f\u007f]+/g, " ")
    .trim()
    .slice(0, max);

// Message keeps line breaks but drops other control characters.
const cleanMessage = (v) =>
  String(v ?? "")
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, "")
    .trim()
    .slice(0, LIMITS.message);

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  return recent.length > MAX_PER_WINDOW;
}

let transporter;
function getTransporter(user, pass) {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass: pass.replace(/\s+/g, "") },
    });
  }
  return transporter;
}

const fail = (res, status, error) => res.status(status).json({ ok: false, error });

// ---- handler ----------------------------------------------------------------
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return fail(res, 405, "Method not allowed");
  }

  const body = req.body && typeof req.body === "object" ? req.body : {};

  // Honeypot: real visitors never see or fill this field. Pretend success so bots learn nothing.
  if (body.website) return res.status(200).json({ ok: true, message: "Your enquiry has been sent successfully." });

  const ip = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown").split(",")[0].trim();
  if (rateLimited(ip)) {
    res.setHeader("Retry-After", "600");
    return fail(res, 429, "Too many enquiries. Please try again in a few minutes or call us.");
  }

  const { EMAIL_USER, EMAIL_APP_PASSWORD, EMAIL_TO } = process.env;
  if (!EMAIL_USER || !EMAIL_APP_PASSWORD || !EMAIL_TO) {
    return fail(res, 503, "Email service is not configured.");
  }

  const customerName = clean(body.name, LIMITS.name);
  const customerEmail = clean(body.email, LIMITS.email);
  const customerPhone = clean(body.phone, LIMITS.phone);
  const shootTypeValue = clean(body.shootType || body.type, LIMITS.type);
  const preferredDate = clean(body.date, LIMITS.date);
  const customerMessage = cleanMessage(body.message || body.msg);

  if (!customerName || !customerEmail || !customerPhone || !shootTypeValue) {
    return fail(res, 400, "Name, email, phone and shoot type are required.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(customerEmail)) {
    return fail(res, 400, "Please enter a valid email address.");
  }
  if (!/^\+?[0-9][0-9\s\-()]{6,18}$/.test(customerPhone)) {
    return fail(res, 400, "Please enter a valid phone number.");
  }
  if (preferredDate && !/^\d{4}-\d{2}-\d{2}$/.test(preferredDate)) {
    return fail(res, 400, "Please enter a valid date.");
  }

  try {
    await getTransporter(EMAIL_USER, EMAIL_APP_PASSWORD).sendMail({
      from: `Golden Photography <${EMAIL_USER}>`,
      to: EMAIL_TO,
      replyTo: customerEmail,
      subject: `New photography enquiry from ${customerName}`,
      text: [
        "New Photography Enquiry",
        "",
        `Name: ${customerName}`,
        `Email: ${customerEmail}`,
        `Phone: ${customerPhone}`,
        `Shoot type: ${shootTypeValue}`,
        `Preferred date: ${preferredDate || "Not provided"}`,
        `Message: ${customerMessage || "Not provided"}`,
      ].join("\n"),
    });
    return res.status(200).json({ ok: true, message: "Your enquiry has been sent successfully." });
  } catch (error) {
    console.error("Booking email failed:", error.code || error.message); // no customer data in logs
    return fail(res, 500, "Email sending failed. Please try again later.");
  }
}
