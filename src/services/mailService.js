const nodemailer = require("nodemailer");
const mailConfig = require("../config/mailConfig");

const transporter = nodemailer.createTransport({
  service: mailConfig.service,
  auth: {
    user: mailConfig.user,
    pass: mailConfig.pass,
  },
});

const sendMail = async (to, subject, text) => {
  const mailOptions = {
    from: mailConfig.user,
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendMail };
