const express = require("express");
const app = express();
const cors = require("cors")

require("dotenv").config();
const PORT= process.env.PORT || 4000 ;

app.use(cors());

app.use(express.json());

require("./config/database").connect();

const user = require("./routes/user")
app.use("/api/v1",user);

app.listen(PORT,()=>console.log(`App is rumming on ${PORT}`));