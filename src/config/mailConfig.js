require("dotenv").config();

const mailConfig = {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
  service: "gmail", // or use 'SendGrid' if needed
};

module.exports = mailConfig;
