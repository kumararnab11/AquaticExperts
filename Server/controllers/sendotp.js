require("dotenv").config();
const nodemailer = require("nodemailer");
const OtpUser = require("../models/otp");

exports.sendotp = async (req, res) => {
    try {
        const usermail = req.body.email;
        const sendermail = process.env.SENDER_MAIL;
        const senderpass = process.env.SENDER_PASS;

        if (!usermail) {
            return res.status(400).json({
                success: false,
                message: "Email is required!",
            });
        }

        // Generate a 4-digit OTP
        const otp = Math.floor(1000 + Math.random() * 9000);

        // Nodemailer transporter setup
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: sendermail,
                pass: senderpass,
            },
        });

        // Email options
        const mailOptions = {
            from: sendermail,
            to: usermail,
            subject: "Your OTP Code For Aquatic Experts",
            text: `Your OTP for verification is: ${otp}. Use it within 5 minutes.`,
        };

        // Send OTP email
        const info = await transporter.sendMail(mailOptions);

        // Save OTP to the database with an expiry of 5 minutes
        await OtpUser.create({ usermail, otp });

        console.log("OTP sent successfully:", info.response);
        return res.status(200).json({
            success: true,
            message: "OTP sent successfully!",
            response: info.response,
        });

    } catch (error) {
        console.error("Error sending OTP:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to send OTP",
            error: error.message,
        });
    }
};


