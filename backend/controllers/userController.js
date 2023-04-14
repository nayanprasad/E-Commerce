const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const CatchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");


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


//Log out

exports.logout = (req, res, next) => {

    res.cookie("token", null, {
        expire: new Date(Date.now()),
        httponly: true
    })

    res.status(200).json({
        success: true,
        message: "logged out"
    })
}



//reset password
exports.forgotpassword = CatchAsyncErrors(async (req, res, next) => {

    const user = await User.findOne({email: req.body.email});

    if(!user)
        return next(new ErrorHandler("user not found", 404));

    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false});

    const resetPasswordUlr = `${req.body.protocols}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `your password reset token is :- \n\n ${resetPasswordUlr} \n\n(ignore if not you)`;

    try {
        await sendEmail({
            email: user.email,
            subject: "ecom password reset",
            message
        });

        res.status(200).json({
            success: true,
            message: `email send to ${user.email}`
        })

    }catch (error ) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave: false});
        return next(new ErrorHandler(error.message, 500));
    }
});

