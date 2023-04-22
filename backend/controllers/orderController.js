const Order = require("../models/orderModel");
const CatchAsyncErrors = require("../middleware/catchAsyncErrors");
const Errorhandler = require("../utils/errorhandler");


exports.sayHello = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Hello from the server side"
    });
}

//create a new order
exports.createOrder = CatchAsyncErrors(async (req, res, next) => {
    const {
        orderItems,
        shippingAddress,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentMethod
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingAddress,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentMethod,
        paidAt: Date.now(),
        user: req.user._id
    });

    res.status(200).json({
        success: true,
        order
    });
});


//get single order
exports.getSingleOrder = CatchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
        return next(new Errorhandler("No order found with this ID", 404));
    }

    res.status(200).json({
        success: true,
        order
    });
});

//get my order (logged in user orders)
exports.getMyOrder = CatchAsyncErrors(async (req, res, next) => {

    const myOrders = await Order.find({user: req.user.id});

    if(!myOrders) {
        return next(new Errorhandler("No order found", 404));
    }

    res.status(200).json({
        success: true,
        myOrders
    });
})