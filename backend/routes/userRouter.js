const express = require("express");
const Router = express.Router();
const {registerUser, loginUser, logout, forgotPassword, resetPassword, getUser, updatePassword, updateProfile} = require("../controllers/userController");
const {isAuthenticatedUser} = require("../middleware/auth");


Router.route("/register").post(registerUser);
Router.route("/login").post(loginUser);
Router.route("/logout").get(logout);
Router.route("/password/forgot").post(forgotPassword);
Router.route("/password/reset/:token").put(resetPassword);
Router.route("/me").get(isAuthenticatedUser, getUser);
Router.route("/password/update").put(isAuthenticatedUser, updatePassword);
Router.route("/me/update").put(isAuthenticatedUser, updateProfile)

module.exports = Router;

