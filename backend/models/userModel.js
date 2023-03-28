const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    maxLength: [30, 'Your name cannot exceed 30 characters'],
    minLength: [4, 'Your name cannot be less than 4 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    validate: [validator.isEmail, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minLength: [8, 'Your password must be longer than 8 characters'],
    select: false, // This will not show the password in the response when we get the user by find methods
  },
  role: {
    type: String,
    default: 'user',
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,

});


userSchema.pre("save", async function(next) {
  if(!this.isModified("password"))
    next();
  this.password = await bcrypt.hash(this.password, 10);
})


module.exports = mongoose.model('User', userSchema);




