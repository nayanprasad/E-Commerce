const express = require("express");
const Router = express.Router();
const {isAuthenticatedUser, isAuthorizedRoles} = require("../middleware/auth");
const {processPayment, sendStripeApi} = require("../controllers/paymentController");

Router.route("/payment/process").post(isAuthenticatedUser, processPayment);
Router.route("/stripeapi").get(isAuthenticatedUser, sendStripeApi);

module.exports = Router;
