
require('dotenv').config()     //Dotenv is a simple way to allow you to create secret keys that your application needs to function and keep them from going public.
const mongoose = require('mongoose');
const express = require("express");
const app = express();
const bodyParser= require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth") //obtaining signout route from auth,js file

//DB connection

mongoose.connect(process.env.DATABASE,{   
    useNewUrlParser: true,   //compulsory, allows to fallback to old parser if there's a bug in the new one
    useUnifiedTopology: true,  //False by default. Set to true to opt in to using the MongoDB driver's new connection management engine.  
    useCreateIndex: true     //False by default. Set to true to make Mongoose's default index build use 
}). then(() => {
    console.log("DB CONNECTED");
});  
 // using middleware parsers

app.use(bodyParser.json()); //we need to parse a variety of stuff through json 
app.use(cookieParser());   //put some values to the cookies or delete values from cookies
app.use(cors());

//My routes
app.use("/api", authRoutes); //create an api route, every address will be prefixed with /api

//Port

const port = process.env.PORT || 8000;  //use env because we don't want sensitive info made public, env file doesn't get uploaded on github

//Starting a server

app.listen(port, () => {
    console.log(`app is running at ${port}`);
});
