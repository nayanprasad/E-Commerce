const express = require("express");
const Router = express.Router();
const {isAuthenticatedUser} = require("../middleware/auth");
const {createOrder, sayHello, getSingleOrder} = require("../controllers/orderController");




Router.route("/order/new").post(isAuthenticatedUser, createOrder)
Router.route("/order/:id").post(isAuthenticatedUser, getSingleOrder);

module.exports = Router;