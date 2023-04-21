const express = require("express");
const Router = express.Router();
const {isAuthenticatedUser} = require("../middleware/auth");
const {createOrder} = require("../controllers/orderController");




Router.route("/order/new").post(isAuthenticatedUser, createOrder)

module.exports = Router;