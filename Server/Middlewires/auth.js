const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
    const token = req.cookies.token_cookie; // Get token from cookies

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.user = decoded; // Attach payload to req.user
        next(); // Move to next middleware or route
    } catch (error) {
        return res.status(403).json({ success: false, message: "Invalid Token" });
    }
};
