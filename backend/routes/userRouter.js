const express = require("express");
const Router = express.Router();
const {registerUser, loginUser, logout} = require("../controllers/userController");


Router.route("/register").post(registerUser);
Router.route("/login").post(loginUser);
Router.route("/logout").get(logout);

module.exports = Router;

