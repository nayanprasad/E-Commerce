const express = require("express");
const Router = express.Router();
const {registerUser, loginUser, logout, forgotPassword, resetPassword} = require("../controllers/userController");


Router.route("/register").post(registerUser);
Router.route("/login").post(loginUser);
Router.route("/logout").get(logout);
Router.route("/password/forgot").post(forgotPassword);
Router.route("/password/reset/:token").put(resetPassword);

module.exports = Router;

