const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const CatchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");

// Register new user   
exports.registerUser = CatchAsyncErrors( async(req, res, next) => {
  const {name, email, password} = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "sample id",
      url: "sample url"
    }
  });

  // const token = user.getJWTToken();   // this method is defined in the useModel
  //
  // res.status(201).json({
  //   success: true,
  //   token
  // });
  sendToken(user,201, res);

});


// Login user
exports.loginUser = CatchAsyncErrors( async(req, res, next) => {

  const {email, password} = req.body;

  if(!email || !password) {
    return next(new ErrorHandler("please enter email & password", 400));
  }
    
  const user = await User.findOne({email}).select("+password");

  if(!user) {
    return next(new ErrorHandler("invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if(!isPasswordMatched)
    return next(new ErrorHandler("invalid email or password", 401));

  sendToken(user,200, res)

});

