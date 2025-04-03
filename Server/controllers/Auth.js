const bcrypt = require("bcrypt");
const user = require("../models/user");
const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // ✅ Check if user already exists
        const existingUser = await user.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        let hashPass;
        let retries = 0;
        const maxRetries = 3;

        // ✅ Retry logic for hashing password
        while (retries < maxRetries) {
            try {
                hashPass = await bcrypt.hash(password, 10);
                break; // If hashing succeeds, exit loop
            } catch (error) {
                console.error(`Hashing attempt ${retries + 1} failed:`, error);
                retries++;
                if (retries === maxRetries) {
                    return res.status(500).json({
                        success: false,
                        message: "Error in hashing password after 3 attempts",
                    });
                }
            }
        }

        // ✅ Create new user
        const newUser = await user.create({
            name,
            email,
            password: hashPass,
        });

        return res.status(200).json({
            success: true,
            message: "User Created Successfully",
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({
            success: false,
            message: "User can't be created",
        });
    }
};



//login

exports.login= async (req,res)=>{
    try{
        const {email,password}= req.body;

        const existingUser = await user.findOne({email});

        if (!existingUser) {
            return res.status(401).json({
                success: false,
                message: "User does not exists",
            });
        }

        const payload = {id: existingUser._id}

        if(await bcrypt.compare(password,existingUser.password)){
            const token = jwt.sign(payload , process.env.JWT_SECRET)

            const options = {
                expires: new Date(Date.now()+ 10 * 24 * 60 * 60 * 1000),
                httpOnly:true,
                secure:false
            }

            return res.cookie("token_cookie",token,options).status(200).json({
                success:true,
                message:"User logged in successfully",
                token,
                user: {
                    _id: existingUser._id,
                    email: existingUser.email,
                    name: existingUser.name,
                    token:token
                },
            })
        }
        else{
            return res.status(403).json({
                success: false,
                message: "Wrong Password",
            });
        }

    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Login Faliure",
        })
    }
}


//update password

exports.forgotpassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        // ✅ Check if user already exists
        const existingUser = await user.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: "User does not exist",
            });
        }

        let hashPass;
        let retries = 0;
        const maxRetries = 3;

        // ✅ Retry logic for hashing password
        while (retries < maxRetries) {
            try {
                hashPass = await bcrypt.hash(password, 10);
                break; // If hashing succeeds, exit loop
            } catch (error) {
                console.error(`Hashing attempt ${retries + 1} failed:`, error);
                retries++;
                if (retries === maxRetries) {
                    return res.status(500).json({
                        success: false,
                        message: "Error in hashing password after 3 attempts",
                    });
                }
            }
        }

        // ✅ Update user
        const updatedUser = await user.findOneAndUpdate(
            { email }, // Filter
            { password: hashPass }, // Update
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(500).json({
                success: false,
                message: "User password can't be updated",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });
    } catch (error) {
        console.error("Forgot password error:", error);
        res.status(500).json({
            success: false,
            message: "An unexpected error occurred",
        });
    }
};

