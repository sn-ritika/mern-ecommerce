const user = require("../models/user");
const User = require("../models/user");
const { check, validationResult } = require("express-validator");    //check against some criteria and validate
var jwt = require("jsonwebtoken");       
var expressJwt = require("express-jwt");


exports.signup = (req,res) => {                        //SIGNUP
    
    const errors = validationResult(req)       //express-validator

    if(!errors.isEmpty()){
        return res.status(422).json({
            error : errors.array()[0].msg
        });
    }
  const user= new User(req.body) //working of body parser in postman, bodyparser
  //user is created from a class of User which was created from a class of mongoose, so all the properties of mongooese will be valid here
  user.save((err, user) => {                    //The user data needs to be saved
      if(err){
          return res.status(400).json({           //throwing a json file will be good for the frontend work
              err : "Not able to save in DB"     //default error message
          })
      }
      res.json({
          name : user.name,
          email: user.email,
          id : user._id

      });
  })                                 
    };

exports.signin =(req,res) => {   //destructuring the data                     //SIGNIN

    const errors = validationResult(req) 
    const{ email, password } = req.body;

    if(!errors.isEmpty()){            //validation
        return res.status(422).json({
            error : errors.array()[0].msg
        });
    } 
    User.findOne({email}, (err, user) => {                                   //finds exactly one match from the databse and ensures whether data exists in the database
        if(err || !user){
            return res.status(400).json({
                error: "User Email doesn't exist"
            })
        }

        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and password do not match"
            });


        }
            //create token
        const token = jwt.sign({_id: user._id},proccess.env.SECRET)
                //put token in cookie
        res.cookie("token",token, { expire : new Date() + 9999});

        //send response to frontend

        const {_id, name, email, role} = user;
        return res.json({ token, user : {_id, name, email,role}});   //destructuring because we do not want all the details moved to the frontend
    });
};
exports.signout = (req,res) => {       //SIGNOUT
    res.clearCookie("token");                   
    res.json({
        message: "User Signout successfully"
    });
};

//protected routes
exports.isSignedIn = expressJwt({
    secret : process.env.SECRET,
    userProperty : "auth"
});


//custom middlewares
