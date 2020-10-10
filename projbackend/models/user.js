
  var mongoose = require("mongoose");
  const crypto = require('crypto');
  const uuidv1 = require('uuid/v1');

  var userSchema = new mongoose.Schema({
      name: {
          type: String,
          required: true,
          maxlenghth: 32,
          trim:true              //trims off the extra spaces
      },
      lastname:{
          type: String,
          maxlength:32,
          trim:true
      },
      email: {
          type: String,
          trim:true,
          required: true,        //A field shouldn't be made required if there's uncertanity about it, rather change it later
          unique: true
      },
      userinfo: {
          type: String,
          trim: true
      },

    encry_password: {           //the password will be encrypted
        type: String,
        required: true
    },
    salt: String,               //used for password (for hashing the password)
    role: {
        type: Number,
        default: 0
    },
    purchases: {
        type: Array,
        default: []            //the purchases are to be stored in an array
    },
 }, {timestamps: true });

userSchema
    .virtual("password")
    .set(function(password){   //setter
        this._passwod = password
        this.salt = uuidv1();
        this.encry_password = this.securePassword(password)
    })                    
    .get(function(){
        this._password
    })                        //getter
  userSchema.methods = {
        authenticate: function(plainpassword) {
            return this.securePassword(plainpassword) === this.ecncry_password
      },

    securePassword: function(plainpassword){
      if(!plainpassword) return "";
      try{
        return crypto
           .createHmac('sha256', this.salt)
           .update(plainpassword)
           .digest('hex');
      } catch(err) {
        return "";
      }
    }
  };
  
  module.exports = mongoose.model('User',userSchema);


  
