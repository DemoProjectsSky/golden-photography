
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const Package = require('./models/Package');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL || '*',
}));
app.use(express.json({ limit: '50kb' }));

// Gmail configuration
const mailConfigured = Boolean(
  process.env.EMAIL_USER &&
  process.env.EMAIL_APP_PASSWORD &&
  process.env.EMAIL_TO
);

const mailer = mailConfigured
  ? nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD.replace(/\s+/g, ''),
      },
    })
  : null;

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    emailConfigured: Boolean(mailer),
    databaseConnected: mongoose.connection.readyState === 1,
  });
});

// Packages API
app.get('/api/packages', async (_req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.json([]);
  }

  try {
    const packages = await Package.find().sort('order');
    return res.json(packages);
  } catch (error) {
    console.error('Package loading failed:', error.message);

    return res.status(500).json({
      ok: false,
      error: 'Could not load packages.',
    });
  }
});

// Booking/contact enquiry API
app.post('/api/bookings', async (req, res) => {
  try {
    if (!mailer) {
      return res.status(503).json({
        ok: false,
        error: 'Email is not configured. Check your Server .env file.',
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

    const customerName = String(name || '').trim();
    const customerEmail = String(email || '').trim();
    const customerPhone = String(phone || '').trim();
    const shootTypeValue = String(shootType || type || '').trim();
    const preferredDate = String(date || '').trim();
    const customerMessage = String(message || msg || '').trim();

    if (
      !customerName ||
      !customerEmail ||
      !customerPhone ||
      !shootTypeValue
    ) {
      return res.status(400).json({
        ok: false,
        error: 'Name, email, phone and shoot type are required.',
      });
    }

    if (!/^\S+@\S+\.\S+$/.test(customerEmail)) {
      return res.status(400).json({
        ok: false,
        error: 'Please enter a valid email address.',
      });
    }

    const result = await mailer.sendMail({
      from: `Lumina Photography <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: customerEmail,
      subject: `New photography enquiry from ${customerName}`,
      text: [
        'New Photography Enquiry',
        '',
        `Name: ${customerName}`,
        `Email: ${customerEmail}`,
        `Phone: ${customerPhone}`,
        `Shoot type: ${shootTypeValue}`,
        `Preferred date: ${preferredDate || 'Not provided'}`,
        `Message: ${customerMessage || 'Not provided'}`,
      ].join('\n'),
    });

    console.log('Email sent successfully:', result.messageId);

    return res.status(200).json({
      ok: true,
      emailSent: true,
      message: 'Your enquiry has been sent successfully.',
    });
  } catch (error) {
    console.error('Nodemailer error:', error.message);

    return res.status(500).json({
      ok: false,
      error: 'Email sending failed. Check the server terminal for details.',
    });
  }
});

// Start API without requiring MongoDB
async function startServer() {
  if (process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI)
      .then(() => console.log('MongoDB connected'))
      .catch(error => {
        console.error('MongoDB unavailable:', error.message);
      });
  } else {
    console.log('MongoDB disabled. Email service can still work.');
  }

  if (mailer) {
    try {
      await mailer.verify();
      console.log('Gmail transporter verified successfully.');
    } catch (error) {
      console.error('Gmail verification failed:', error.message);
    }
  } else {
    console.error(
      'Email disabled. Check EMAIL_USER, EMAIL_APP_PASSWORD and EMAIL_TO.'
    );
  }

  app.listen(PORT, () => {
    console.log(`API running at http://localhost:${PORT}`);
  });
}

startServer();
