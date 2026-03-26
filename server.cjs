const nodemailer = require("nodemailer");
const multer = require("multer");

// 1. MUST ADD: Disable Vercel's default body parser so Multer can process the file
export const config = {
  api: {
    bodyParser: false,
  },
};

// 2. Configure Multer to keep the file in memory (Vercel has a read-only file system)
const upload = multer({ storage: multer.memoryStorage() });

// Helper function to run Express-style middleware (like Multer) in Vercel Serverless functions
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

// 3. Removed global verify block to prevent cold-start delays
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/* ---------------- CONTACT API ---------------- */

export default async function handler(req, res) {
  // Ensure we only accept POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 4. Run Multer middleware to parse the form data. 
    // This expects the file input in your frontend to be named "image"
    await runMiddleware(req, res, upload.single("image"));
  } catch (error) {
    console.error("❌ Form parsing error:", error);
    return res.status(500).json({ error: "Failed to process form data" });
  }

  // Escape HTML to prevent XSS attacks
  function escapeHtml(text) {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return text ? text.replace(/[&<>"']/g, (m) => map[m]) : "";
  }

  try {
    const { name, email, message, website } = req.body;
    const image = req.file;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        error: "Name, email, and message are required",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Invalid email format",
      });
    }

    console.log("📧 Processing contact form submission from:", email);

    // Prepare attachments
    const attachments = [];
    if (image) {
      attachments.push({
        filename: image.originalname || "image.jpg",
        content: image.buffer,
      });
    }

    // Prepare Owner Email Options
    const ownerMailOptions = {
      from: `"Tianshani Contact" <${process.env.SMTP_USER}>`,
      to: process.env.OWNER_EMAIL,
      subject: `🔔 New Lead: ${name}`,
      html: `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>New Contact Message</title></head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;">
  <div style="padding:20px;background:#f9f9f9;border-radius:8px;">
    <h2 style="color:#333;">🔔 New Contact Message</h2>
    <p><b>Name:</b> ${escapeHtml(name)}</p>
    <p><b>Email:</b> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
    ${website ? `<p><b>Website/Page:</b> <a href="${escapeHtml(website)}" target="_blank">${escapeHtml(website)}</a></p>` : ""}
    <p><b>Message:</b></p>
    <p style="background:#f4f4f4;padding:10px;border-radius:6px;color:#555;">${escapeHtml(message).replace(/\n/g, "<br>")}</p>
  </div>
</body>
</html>`,
      attachments,
    };

    // Prepare User Auto-Reply Options
    const userMailOptions = {
      from: `"Tianshani Team 🏔️" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "We received your request ✨",
      html: `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>We received your request ✨</title></head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f9f9f9;">
  <div style="padding:30px">
    <div style="max-width:600px;margin:auto;background:white;padding:30px;border-radius:12px;border:1px solid #eee">
      <h2 style="color:#333;">Thanks for contacting Tianshani 🏔️</h2>
      <p>Hi ${escapeHtml(name)} 👋</p>
      <p>Thank you for reaching out!<br>We received your message and our team will reply soon 🚀</p>
      <hr style="margin:25px 0;border:0;border-top:1px solid #eee;">
      <p>გამარჯობა ${escapeHtml(name)},<br><br>გმადლობთ, რომ დაუკავშირდით <b>Tianshani</b>-ს ✨<br>თქვენი შეტყობინება მიღებულია და მალე დაგიკავშირდებით ✅</p>
      <hr style="margin:25px 0;border:0;border-top:1px solid #eee;">
      <p style="color:#666;font-size:14px;">Best regards,<br><b>Tianshani Team 🏔️</b><br><br>
      📩 Contact us on Telegram:<br>
      <a href="https://t.me/+995574282845" style="color:#1a73e8;text-decoration:none;">Message us on Telegram</a></p>
    </div>
  </div>
</body>
</html>`,
    };

    // 5. Send both emails concurrently to avoid hitting Vercel's timeout limit
    console.log("📧 Dispatching emails...");
    await Promise.all([
      transporter.sendMail(ownerMailOptions),
      transporter.sendMail(userMailOptions)
    ]);

    console.log("✅ All emails sent successfully");

    // Success response
    res.status(200).json({
      success: true,
      message: "Your message was sent successfully 🎉",
    });

  } catch (error) {
    console.error("❌ Email sending error:", error);

    // Don't expose sensitive error details to client in production
    res.status(500).json({
      error: "Failed to send email. Please try again later.",
      details: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}