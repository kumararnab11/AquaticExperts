const express = require("express");
const routes = express.Router();

const {login,signup} = require("../controllers/Auth");
const {sendotp} = require("../controllers/sendotp");
const {verifyotp} = require("../controllers/verifyotp");

routes.post("/login",login);
routes.post("/signup",signup);
routes.post("/sendotp",sendotp);
routes.post("/verifyotp",verifyotp);

module.exports=routes;