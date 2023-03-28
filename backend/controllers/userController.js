const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const CatchAsyncErrors = require("../middleware/catchAsyncErrors");


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

  const token = user.getJWTToken();

  res.status(201).json({
    success: true,
    token
  });

});

