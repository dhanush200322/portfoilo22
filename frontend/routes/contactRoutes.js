import express from "express";
import Contact from "../models/Contact.js";
import nodemailer from "nodemailer";

const router = express.Router();

// POST /api/contact
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Save to MongoDB
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    // ---------- SEND EMAIL USING NODEMAILER ----------
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,   // Gmail ID
        pass: process.env.EMAIL_PASS    // App Password
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,       // send to your own Gmail
      subject: `New Contact Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: "Message sent successfully!" });
  } catch (error) {
    console.log("Error sending message:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
