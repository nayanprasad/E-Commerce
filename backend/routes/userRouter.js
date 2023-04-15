const express = require("express");
const Router = express.Router();
const {registerUser, loginUser, logout, forgotPassword, resetPassword, getUser, updatePassword, updateProfile,
    getAllUsers, getSingleUser, deleteAUser, updateRole
} = require("../controllers/userController");
const {isAuthenticatedUser, isAuthorizedRoles} = require("../middleware/auth");


Router.route("/register").post(registerUser);
Router.route("/login").post(loginUser);
Router.route("/logout").get(logout);
Router.route("/password/forgot").post(forgotPassword);
Router.route("/password/reset/:token").put(resetPassword);
Router.route("/me").get(isAuthenticatedUser, getUser);
Router.route("/password/update").put(isAuthenticatedUser, updatePassword);
Router.route("/me/update").put(isAuthenticatedUser, updateProfile)
Router.route("/admin/users").get(isAuthenticatedUser, isAuthorizedRoles("admin"), getAllUsers);
Router.route("/admin/users/:id")
    .get(isAuthenticatedUser, isAuthorizedRoles("admin"), getSingleUser)
    .delete(isAuthenticatedUser, isAuthorizedRoles("admin"), deleteAUser)
    .put(isAuthenticatedUser, isAuthorizedRoles("admin"), updateRole)


module.exports = Router;

