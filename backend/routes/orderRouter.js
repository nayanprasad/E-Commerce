const express = require("express");
const Router = express.Router();
const {isAuthenticatedUser, isAuthorizedRoles} = require("../middleware/auth");
const {createOrder, sayHello, getSingleOrder, getMyOrder, getAllOrders, updateOrderStatus, deleteOrder} = require("../controllers/orderController");


Router.route("/order/new").post(isAuthenticatedUser, createOrder)
Router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
Router.route("/orders/me").get(isAuthenticatedUser, getMyOrder);     // "/order/me" is not possible since "/order/:id" is already present
Router.route("/admin/orders").get(isAuthenticatedUser, isAuthorizedRoles("admin"), getAllOrders);
Router.route("/admin/order/:id")
    .get(isAuthenticatedUser, isAuthorizedRoles("admin"), updateOrderStatus)
    .delete(isAuthenticatedUser, isAuthorizedRoles("admin"), deleteOrder);


module.exports = Router;
