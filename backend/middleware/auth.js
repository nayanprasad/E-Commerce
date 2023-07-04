const CatchAsyncErrors = require("../middleware/catchAsyncErrors")
const ErrorHandler = require("../utils/errorhandler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


exports.isAuthenticatedUser = CatchAsyncErrors(async (req, res, next) => {


    if(req.cookies.token) {
        if(!req.headers.authorization)
            return next(new ErrorHandler("no token found", 401));

        const token = req.cookies.token

        if(token !== req.headers.authorization.split(" ")[1])
            return next(new ErrorHandler("Invalid token", 401));

        if(!token || token === "j:null")
            return next(new ErrorHandler("please login to access this resource", 401));

        const decodedData = jwt.verify(token, process.env.JWT_SECRETE);

        const user = await User.findById(decodedData.id);
        req.user = user
        next();
    }
    else {
        return next(new ErrorHandler("please login to access this resource", 401));
    }
});



exports.isAuthorizedRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes((req.user.role))) {
            return next(new ErrorHandler(`role: ${req.user.role} is not allowed access this resource`, 403));
        }
        next();
    }
};

