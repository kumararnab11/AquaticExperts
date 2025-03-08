const userModel = require("../models/user");

exports.getUser = async (req, res, next) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is missing",
            });
        }

        const fetchedUser = await userModel.findById(userId);

        if (!fetchedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        req.fetchedUser = fetchedUser; // Attach user data to req
        next(); // Continue to the next middleware/route handler
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({
            success: false,
            message: "Error in fetching user from DB",
        });
    }
};