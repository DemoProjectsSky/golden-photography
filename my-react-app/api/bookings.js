
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      ok: false,
      error: "Method not allowed",
    });
  }

  try {
    const {
      EMAIL_USER,
      EMAIL_APP_PASSWORD,
      EMAIL_TO,
    } = process.env;

    if (!EMAIL_USER || !EMAIL_APP_PASSWORD || !EMAIL_TO) {
      return res.status(503).json({
        ok: false,
        error: "Email service is not configured.",
      });
    }

    const {
      name,
      email,
      phone,
      shootType,
      type,
      date,
      message,
      msg,
    } = req.body || {};

    const customerName = String(name || "").trim();
    const customerEmail = String(email || "").trim();
    const customerPhone = String(phone || "").trim();
    const shootTypeValue = String(shootType || type || "").trim();
    const preferredDate = String(date || "").trim();
    const customerMessage = String(message || msg || "").trim();

    if (
      !customerName ||
      !customerEmail ||
      !customerPhone ||
      !shootTypeValue
    ) {
      return res.status(400).json({
        ok: false,
        error: "Name, email, phone and shoot type are required.",
      });
    }

    if (!/^\S+@\S+\.\S+$/.test(customerEmail)) {
      return res.status(400).json({
        ok: false,
        error: "Please enter a valid email address.",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_APP_PASSWORD.replace(/\s+/g, ""),
      },
    });

    const result = await transporter.sendMail({
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

    console.log("Email sent:", result.messageId);

    return res.status(200).json({
      ok: true,
      emailSent: true,
      message: "Your enquiry has been sent successfully.",
    });

  } catch (error) {
    console.error("Nodemailer error:", error.message);

    return res.status(500).json({
      ok: false,
      error: "Email sending failed. Please try again later.",
    });
  }
}
