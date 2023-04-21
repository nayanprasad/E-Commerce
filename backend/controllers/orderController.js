const Order = require("../models/orderModel");
const CatchAsyncErrors = require("../middleware/catchAsyncErrors");
const Errorhandler = require("../utils/errorhandler");


//create a new orderr
exports.createOrder = CatchAsyncErrors(async (req, res, next) => {
    const {shippingAddress} = req.body
})