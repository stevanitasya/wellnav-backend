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

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Email Verification',
    text: `Please verify your email by clicking on the following link: http://localhost:5001/api/users/verify-email?token=${token}`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendVerificationEmail;