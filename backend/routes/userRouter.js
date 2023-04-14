const express = require("express");
const Router = express.Router();
const {registerUser, loginUser, logout, forgotpassword} = require("../controllers/userController");


Router.route("/register").post(registerUser);
Router.route("/login").post(loginUser);
Router.route("/logout").get(logout);
Router.route("/password/forgot").post(forgotpassword)

module.exports = Router;

