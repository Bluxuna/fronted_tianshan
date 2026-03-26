// const express = require("express");
// const nodemailer = require("nodemailer");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const multer = require("multer");

// const upload = multer({ storage: multer.memoryStorage() });

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3001;

// app.use(cors());
// app.use(express.json());

// /* ---------------- SMTP CONFIG ---------------- */

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST || "smtp.gmail.com",
//   port: Number(process.env.SMTP_PORT) || 587,
//   secure: Number(process.env.SMTP_PORT) === 465, // true for 465
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS
//   }
// });

// // verify connection
// transporter.verify((error) => {
//   if (error) {
//     console.error("❌ SMTP connection error:", error);
//   } else {
//     console.log("✅ SMTP server ready to send emails");
//   }
// });

// /* ---------------- CONTACT API ---------------- */

// app.post("/api/contact", upload.single("image"), async (req, res) => {
//   const { name, email, message, website } = req.body;
//   const image = req.file;

//   if (!name || !email || !message) {
//     return res.status(400).json({ error: "Name, email, and message are required" });
//   }

//   try {

//     /* -------- OWNER EMAIL -------- */

//     console.log("📧 Sending notification to owner...");

//     const attachments = [];
//     if (image) {
//       attachments.push({
//         filename: image.originalname,
//         content: image.buffer,
//       });
//     }

//     await transporter.sendMail({
//       from: `"Tianshani Contact" <${process.env.SMTP_USER}>`,
//       to: process.env.OWNER_EMAIL,
//       subject: `🔔 New Lead: ${name}`,
//       html: `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8">
//   <title>New Contact Message</title>
// </head>
// <body style="margin:0;padding:0;font-family:Arial,sans-serif;">
//   <div style="padding:20px">
//     <h2>🔔 New Contact Message</h2>
//     <p><b>Name:</b> ${name}</p>
//     <p><b>Email:</b> ${email}</p>
//     ${website ? `<p><b>Website/Page:</b> <a href="${website}">${website}</a></p>` : ""}
//     <p><b>Message:</b></p>
//     <p style="background:#f4f4f4;padding:10px;border-radius:6px">${message}</p>
//   </div>
// </body>
// </html>`,
//       attachments,
//     });

//     /* -------- USER AUTO REPLY -------- */

//     console.log("📧 Sending auto-reply to user...");

//     const htmlContent = `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8">
//   <title>We received your request ✨</title>
// </head>
// <body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f9f9f9;">
//   <div style="padding:30px">
//     <div style="max-width:600px;margin:auto;background:white;padding:30px;border-radius:12px;border:1px solid #eee">

//       <h2>Thanks for contacting Tianshani 🏔️</h2>

//       <p>Hi ${name} 👋</p>

//       <p>
//       Thank you for reaching out!<br>
//       We received your message and our team will reply soon 🚀
//       </p>

//       <hr style="margin:25px 0;border:0;border-top:1px solid #eee;">

//       <p>
//       გამარჯობა ${name},<br><br>
//       გმადლობთ, რომ დაუკავშირდით <b>Tianshani</b>-ს ✨<br>
//       თქვენი შეტყობინება მიღებულია და მალე დაგიკავშირდებით ✅
//       </p>

//       <hr style="margin:25px 0;border:0;border-top:1px solid #eee;">

//       <p style="color:#666">
//       Best regards,<br>
//       <b>Tianshani Team 🏔️</b>
//       </p>

//     </div>
//   </div>
// </body>
// </html>`;

//     await transporter.sendMail({
//       from: `"Tianshani Team 🏔️" <${process.env.SMTP_USER}>`,
//       to: email,
//       subject: "We received your request ✨",
//       html: htmlContent
//     });

//     console.log("✅ Emails sent successfully");

//     res.json({
//       success: true,
//       message: "Your message was sent successfully 🎉"
//     });

//   } catch (error) {
//     console.error("❌ Email error:", error);

//     res.status(500).json({
//       error: "Failed to send email",
//       details: error.message
//     });
//   }
// });

// /* ---------------- HEALTH CHECK ---------------- */

// app.get("/health", (req, res) => {
//   res.json({
//     status: "Server running 🚀",
//     time: new Date()
//   });
// });

// /* ---------------- SERVE STATIC FILES ---------------- */

// app.use(express.static("dist"));

// // Catch-all route to serve index.html for React router
// const path = require("path");
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist", "index.html"), (err) => {
//     if (err) {
//       res.status(500).send("index.html not found. Have you built the frontend?");
//     }
//   });
// });

// /* ---------------- START SERVER ---------------- */

// app.listen(port, () => {
//   console.log(`🚀 Server running on http://localhost:${port}`);
// });

const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// CORS Configuration - Allow requests from any origin
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: false
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------------- SMTP CONFIG ---------------- */

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports like 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Verify connection
transporter.verify((error) => {
  if (error) {
    console.error("❌ SMTP connection error:", error);
  } else {
    console.log("✅ SMTP server ready to send emails");
  }
});

/* ---------------- CONTACT API ---------------- */

app.post("/api/contact", upload.single("image"), async (req, res) => {
  try {
    const { name, email, message, website } = req.body;
    const image = req.file;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: "Name, email, and message are required" 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: "Invalid email format" 
      });
    }

    console.log("📧 Processing contact form submission from:", email);

    /* -------- OWNER EMAIL -------- */

    console.log("📧 Sending notification to owner...");

    const attachments = [];
    if (image) {
      attachments.push({
        filename: image.originalname || "image.jpg",
        content: image.buffer,
      });
    }

    // Send email to owner
    await transporter.sendMail({
      from: `"Tianshani Contact" <${process.env.SMTP_USER}>`,
      to: process.env.OWNER_EMAIL,
      subject: `🔔 New Lead: ${name}`,
      html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New Contact Message</title>
</head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;">
  <div style="padding:20px;background:#f9f9f9;border-radius:8px;">
    <h2 style="color:#333;">🔔 New Contact Message</h2>
    <p><b>Name:</b> ${escapeHtml(name)}</p>
    <p><b>Email:</b> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
    ${website ? `<p><b>Website/Page:</b> <a href="${escapeHtml(website)}" target="_blank">${escapeHtml(website)}</a></p>` : ""}
    <p><b>Message:</b></p>
    <p style="background:#f4f4f4;padding:10px;border-radius:6px;color:#555;">${escapeHtml(message).replace(/\n/g, '<br>')}</p>
  </div>
</body>
</html>`,
      attachments,
    });

    console.log("✅ Owner email sent successfully");

    /* -------- USER AUTO REPLY -------- */

    console.log("📧 Sending auto-reply to user...");

    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>We received your request ✨</title>
</head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f9f9f9;">
  <div style="padding:30px">
    <div style="max-width:600px;margin:auto;background:white;padding:30px;border-radius:12px;border:1px solid #eee">

      <h2 style="color:#333;">Thanks for contacting Tianshani 🏔️</h2>

      <p>Hi ${escapeHtml(name)} 👋</p>

      <p>
        Thank you for reaching out!<br>
        We received your message and our team will reply soon 🚀
      </p>

      <hr style="margin:25px 0;border:0;border-top:1px solid #eee;">

      <p>
        გამარჯობა ${escapeHtml(name)},<br><br>
        გმადლობთ, რომ დაუკავშირდით <b>Tianshani</b>-ს ✨<br>
        თქვენი შეტყობინება მიღებულია და მალე დაგიკავშირდებით ✅
      </p>

      <hr style="margin:25px 0;border:0;border-top:1px solid #eee;">

      <p style="color:#666;font-size:14px;">
        Best regards,<br>
        <b>Tianshani Team 🏔️</b><br><br>

        📩 Contact us on Telegram:<br>
        <a href="https://t.me/+995574282845" 
           style="color:#1a73e8;text-decoration:none;">
           Message us on Telegram
        </a>
      </p>

    </div>
  </div>
</body>
</html>`;

    await transporter.sendMail({
      from: `"Tianshani Team 🏔️" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "We received your request ✨",
      html: htmlContent
    });

    console.log("✅ Auto-reply email sent successfully");
    console.log("✅ All emails sent successfully");

    // Success response
    res.status(200).json({
      success: true,
      message: "Your message was sent successfully 🎉"
    });

  } catch (error) {
    console.error("❌ Email error:", error);

    // Don't expose sensitive error details to client
    res.status(500).json({
      error: "Failed to send email. Please try again later.",
      details: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
});

/* ---------------- HEALTH CHECK ---------------- */

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "Server running 🚀",
    time: new Date().toISOString()
  });
});

/* ---------------- SERVE STATIC FILES ---------------- */

app.use(express.static("dist"));

// Catch-all route to serve index.html for React router
const path = require("path");
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"), (err) => {
    if (err) {
      res.status(500).send("index.html not found. Have you built the frontend?");
    }
  });
});

/* ---------------- UTILITY FUNCTIONS ---------------- */

// Escape HTML to prevent XSS attacks
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

/* ---------------- START SERVER ---------------- */

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
