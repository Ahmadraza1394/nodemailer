const { sendMail } = require("../services/mailService");
const fs = require("fs");
const path = require("path");

const sendEmailController = async (req, res) => {
  const { to, subject, text } = req.body; // Extract email data from request body
  try {
    const result = await sendMail(to, subject, text);

    // Save email details to log file
    const logFilePath = path.join(__dirname, "../../email_logs.json");
    const emailLog = { to, subject, text, date: new Date() };

    // Append new log entry to existing log file
    fs.readFile(logFilePath, (err, data) => {
      if (err) {
        fs.writeFile(logFilePath, JSON.stringify([emailLog]), () => {});
      } else {
        const logs = JSON.parse(data);
        logs.push(emailLog);
        fs.writeFile(logFilePath, JSON.stringify(logs), () => {});
      }
    });

    res.status(200).json({ message: "Email sent successfully!", result });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to send email", details: error.message });
  }
};

module.exports = { sendEmailController };
