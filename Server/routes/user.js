const express = require("express");
const router = express.Router();

const { login, signup,forgotpassword } = require("../controllers/Auth");
const { sendotp } = require("../controllers/sendotp");
const { verifyotp } = require("../controllers/verifyotp");
const { authMiddleware } = require("../Middlewires/auth");
const {getUser}= require("../Middlewires/getUser.js");
const {addAddress,deleteAddress} = require("../controllers/address.js");
const {logout}=require("../controllers/logout.js")
const {getProduct,getAllProduct,getCategoryProduct} = require("../controllers/getproduct.controller.js")

const {newProduct,updateProduct}=require("../controllers/product.controllers.js");
const { addItem, deleteItem, updateItem } = require("../controllers/cart.js");

router.post("/login", login);
router.post("/signup", signup);
router.put("/forgotpassword", forgotpassword);
router.post("/sendotp", sendotp);
router.post("/verifyotp", verifyotp);
router.put("/updateaddress", addAddress);
router.put("/deleteaddress", deleteAddress);
router.post("/logout", logout);
router.get("/getproduct/:productId",getProduct)
router.get("/getallproduct",getAllProduct)
router.post("/getcategoryproduct",getCategoryProduct)
router.post("/additemcart",addItem)
router.post("/deleteitemcart",deleteItem)
router.post("/updateitemcart",updateItem)

router.get("/dashboard", authMiddleware, getUser, (req, res) => {
    console.log("User in dashboard:", req.user);
    return res.status(200).json({
        success: true,
        message: "Welcome to the dashboard",
        fetchedUser: req.fetchedUser
    });
});


router.post("/addproduct", newProduct);
router.put("/updateproduct", updateProduct);

module.exports = router;