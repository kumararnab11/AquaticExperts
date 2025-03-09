const express = require("express");
const app = express();
const cors = require("cors")
const cookieParser = require("cookie-parser")

require("dotenv").config();
const PORT= process.env.PORT || 41000 ;

app.use(cors({
    origin: "http://localhost:5173", // ✅ Allow only frontend origin
    credentials: true, // ✅ Allow sending cookies
}));

app.use(express.json());
app.use(cookieParser());

require("./config/database").connect();

const user = require("./routes/user")
app.use("/api/v1",user);

app.listen(PORT,()=>console.log(`App is rumming on ${PORT}`));