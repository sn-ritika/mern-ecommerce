var express = require('express')
var router = express.Router()
// const {desired method} = require(go one folder back../controllers/auth)
const { check, validationResult } = require("express-validator");  //validating the user provided data
const {signout,signup,signin, isSignedIn} = require("../controllers/auth");

router.post("/signup", [
    check("name", "name should be at least 3 char").isLength({min : 3}),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({min : 3})
], signup); 

router.post("/signin", [
    check("email", "email is required").isEmail(),
    check("password", "password is required").isLength({min : 1})
], signin); 

// for post requests we use postman not browser   router.post("/",[check],varname)
router.get("/signout", signout);  //the signout variable declaration lies in the auth.js file in the controllers folder

router.get("/testroute", isSignedIn ,(req,res) => {    //isSignedIn is the middleware here
    res.send("A protected route");
});
module.exports = router; 

//we need to bring this file back to app.js using 
// const varname = require(./path) ./ means from the current location to...