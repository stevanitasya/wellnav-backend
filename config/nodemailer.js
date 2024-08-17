// config/nodemailer.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const sendVerificationEmail = async (user, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const vercelUrlBE = process.env.VERCEL_URLBACKEND || 'http://localhost:5001'
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Email Verification',
    text: `Please verify your email by clicking on the following link: ${vercelUrlBE}?token=${token}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendVerificationEmail;