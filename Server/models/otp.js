const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    usermail: { type: String, required: true },
    otp: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now, expires: 300 } // Expires in 300 seconds (5 minutes)
});

module.exports = mongoose.model("OtpUser", otpSchema);