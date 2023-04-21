const express = require("express");
const Router = express.Router();
const { getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct, addProductReview,
    getProductReview, deleteProductReview
} = require("../controllers/productController");
const {isAuthenticatedUser, isAuthorizedRoles} = require("../middleware/auth");

Router.route("/products").get(getAllProducts);
Router.route("/admin/product/new").post(isAuthenticatedUser, isAuthorizedRoles("admin"), createProduct);
Router.route("/admin/product/:id")
    .put(isAuthenticatedUser, isAuthorizedRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, isAuthorizedRoles("admin"), deleteProduct);
Router.route("/product/:id").get(getSingleProduct)
Router.route("/review").put(isAuthenticatedUser, addProductReview)
Router.route("/reviews")
    .get(isAuthenticatedUser, getProductReview)
    .delete(isAuthenticatedUser, deleteProductReview);


module.exports = Router;

