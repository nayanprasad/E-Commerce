const CatchAsyncErrors = require("../middleware/catchAsyncErrors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Process stripe payments
exports.processPayment = CatchAsyncErrors(async (req, res, next) => {

    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        metadata: {integration_check: "accept_a_payment"},
    });

    console.log(paymentIntent)

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret,
    });
});

exports.sendStripeApi = CatchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
        success: true,
        stripeApiKey: process.env.STRIPE_API_KEY
    })
});
