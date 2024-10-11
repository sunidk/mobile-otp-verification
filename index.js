const express = require("express");
const twilio = require("twilio");
require("dotenv").config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const TWILIO_MESSAGING_SERVICE_SID = process.env.TWILIO_MESSAGING_SERVICE_SID;

app.post("/send-otp", async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ msg: "Phone number is required!" });
    }

    await twilioClient.verify
      .services(TWILIO_MESSAGING_SERVICE_SID)
      .verifications.create({
        to: phoneNumber,
        channel: "sms",
    });

    return res.status(200).json({ msg: "SMS sent successfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Failed to send SMS", error: error.message });
  }
});

app.post("/verify-otp", async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;

    if (!phoneNumber || !otp) {
      return res.status(400).json({ msg: "Phone number and otp are required!" });
    }

    const verificationCheck = await twilioClient.verify
      .services(TWILIO_MESSAGING_SERVICE_SID)
      .verificationChecks.create({
        to: phoneNumber,
        code: otp,
    });

    if(verificationCheck.status == 'approved'){
        res.status(200).send({ msg: "OTP verified successfully" });
    }
    else{
        res.status(400).send({ msg: "Invalid OTP!" });
    }
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Verification failed", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
