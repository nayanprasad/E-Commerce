const Order = require("../models/orderModel");
const CatchAsyncErrors = require("../middleware/catchAsyncErrors");
const Errorhandler = require("../utils/errorhandler");
const Product = require("../models/productModel");


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
        paymentMethod,
        paymentResult
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingAddress,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentMethod,
        paymentResult,
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

//get my order (logged-in user orders)
exports.getMyOrder = CatchAsyncErrors(async (req, res, next) => {

    const myOrders = await Order.find({user: req.user.id});

    if(!myOrders) {
        return next(new Errorhandler("No order found", 404));
    }

    res.status(200).json({
        success: true,
        myOrders
    });
});


// get all  orders --admin
exports.getAllOrders = CatchAsyncErrors(async (req, res, next) => {

    const orders = await Order.find();

    if(!orders) {
        return next(new Errorhandler("No order found", 404));
    }

    let totalPrice = 0;
    orders.forEach((order) => {
        totalPrice += order.totalPrice
    })

    res.status(200).json({
        success: true,
        orders,
        totalPrice
    });
});

// update order status  --admin
exports.updateOrderStatus = CatchAsyncErrors(async (req, res, next) => {

    const orders = await Order.findById(req.params.id);

    if(!orders) {
        return next(new Errorhandler("No order found", 404));
    }

    if(orders.orderStatus === "Delivered") {
        return next(new Errorhandler("order delivered", 400));
    }

    orders.orderStatus = req.body.status;

    if(orders.orderStatus === "Delivered") {
        orders.deliveredAt = Date.now();
    }

    await orders.save({validateBeforeSave: false});

    res.status(200).json({
        success: true,
        orders,
    });
});

// delete  order --admin
exports.deleteOrder = CatchAsyncErrors(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if(!order) {
        return next(new Errorhandler("No order found", 404));
    }

    await Order.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
    });
});
