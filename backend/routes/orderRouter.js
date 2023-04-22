const express = require("express");
const Router = express.Router();
const {isAuthenticatedUser} = require("../middleware/auth");
const {createOrder, sayHello, getSingleOrder, getMyOrder} = require("../controllers/orderController");




Router.route("/order/new").post(isAuthenticatedUser, createOrder)
Router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
Router.route("/orders/me").get(isAuthenticatedUser, getMyOrder);     // "/order/me" is not possible since "/order/:id" is already present

module.exports = Router;