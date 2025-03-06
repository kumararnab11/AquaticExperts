const mongoose=require("mongoose");
require("dotenv").config();

exports.connect = ()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log("DB CONNECTED SUCCESSFULLY"))
    .catch((error)=>{
        console.log("Error in connecting DB")
        console.log(error);
        process.exit(1);
    })
}
