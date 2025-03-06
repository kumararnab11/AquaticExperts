const OtpUser = require("../models/otp");

exports.verifyotp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Find OTP record for the user
        const user = await OtpUser.findOne({ usermail: email });

        // Check if user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "OTP expired or not found!",
            });
        }

        // Validate OTP
        if (user.otp === Number(otp)) {
            // Delete OTP after successful verification
            await OtpUser.deleteOne({ _id: user._id });

            return res.status(200).json({
                success: true,
                message: "OTP verified successfully!",
            });
        } else {
            return res.status(403).json({
                success: false,
                message: "Wrong OTP!",
            });
        }
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};