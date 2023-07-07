const CatchAsyncErrors = require("../middleware/catchAsyncErrors")
const ErrorHandler = require("../utils/errorhandler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


exports.isAuthenticatedUser = CatchAsyncErrors(async (req, res, next) => {

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
        return next(new ErrorHandler("A token is required for authentication", 403))
    }

    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRETE);
        const user = await User.findById(decodedData.id);
        req.user = user
    } catch (err) {
        return next(new ErrorHandler("Invalid token", 401))
    }
    return next();
});



exports.isAuthorizedRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes((req.user.role))) {
            return next(new ErrorHandler(`role: ${req.user.role} is not allowed access this resource`, 403));
        }
        next();
    }
};

