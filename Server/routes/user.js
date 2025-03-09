const express = require("express");
const router = express.Router();

const { login, signup } = require("../controllers/Auth");
const { sendotp } = require("../controllers/sendotp");
const { verifyotp } = require("../controllers/verifyotp");
const { authMiddleware } = require("../Middlewires/auth");
const {getUser}= require("../Middlewires/getUser.js");
const {addAddress,deleteAddress} = require("../controllers/address.js")

router.post("/login", login);
router.post("/signup", signup);
router.post("/sendotp", sendotp);
router.post("/verifyotp", verifyotp);
router.put("/updateaddress", addAddress);
router.put("/deleteaddress", deleteAddress);

router.get("/dashboard", authMiddleware, getUser, (req, res) => {
    console.log("User in dashboard:", req.user);
    return res.status(200).json({
        success: true,
        message: "Welcome to the dashboard",
        fetchedUser: req.fetchedUser
    });
});

module.exports = router;