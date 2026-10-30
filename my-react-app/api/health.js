export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  return res.status(200).json({
    ok: true,
    emailConfigured: Boolean(
      process.env.EMAIL_USER &&
      process.env.EMAIL_APP_PASSWORD &&
      process.env.EMAIL_TO
    ),
    message: "Golden Photography API is running",
  });
}