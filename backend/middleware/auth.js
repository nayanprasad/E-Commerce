const CatchAsyncErrors = require("../middleware/catchAsyncErrors")
const ErrorHandler = require("../utils/errorhandler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


exports.isAuthenticatedUser = CatchAsyncErrors(async (req, res, next) => {

    const {token} = req.cookies;

    // console.log(token)

    if(!token || token === "j:null")
        return next(new ErrorHandler("please login to access this resource", 401));

    const decodedData = await jwt.verify(token, process.env.JWT_SECRETE);

    req.user = await User.findById(decodedData.id);

    next();
});



exports.isAuthorizedRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes((req.user.role))) {
            return next(new ErrorHandler(`role: ${req.user.role} is not allowed access this resource`, 403));
        }
        next();
    }
};
