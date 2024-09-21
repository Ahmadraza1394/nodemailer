const express = require("express");
const router = express.Router(); // Initialize the router
const { sendEmailController } = require("../controllers/mailController");

// Define the POST route for sending emails
router.post("/send", sendEmailController);

// Define the GET route for fetching logs
router.get("/logs", (req, res) => {
  const fs = require("fs");
  const path = require("path");
  const logFilePath = path.join(__dirname, "../../email_logs.json");

  if (fs.existsSync(logFilePath)) {
    const rawData = fs.readFileSync(logFilePath);
    const logs = JSON.parse(rawData);
    res.status(200).json(logs);
  } else {
    res.status(404).json({ message: "No logs found" });
  }
});

module.exports = router;
