const express = require("express");
const Router = express.Router();
const { getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct, addProductReview,
    getProductReview, deleteProductReview, getAllProductsAdmin
} = require("../controllers/productController");
const {isAuthenticatedUser, isAuthorizedRoles} = require("../middleware/auth");
const multer = require('multer');
const upload = multer({
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB in bytes
    },
})

Router.route("/products").get(getAllProducts);
Router.route("/admin/product/new").post(isAuthenticatedUser, isAuthorizedRoles("admin"), createProduct);
Router.route("/admin/product/:id")
    .put(isAuthenticatedUser, isAuthorizedRoles("admin"), upload.single('file'), updateProduct)
    .delete(isAuthenticatedUser, isAuthorizedRoles("admin"), deleteProduct);
Router.route("/product/:id").get(getSingleProduct)
Router.route("/review").put(isAuthenticatedUser, addProductReview)
Router.route("/reviews")
    .get(isAuthenticatedUser, getProductReview)
    .delete(isAuthenticatedUser, deleteProductReview);
Router.route("/admin/products").get(isAuthenticatedUser, isAuthorizedRoles("admin"), getAllProductsAdmin);


module.exports = Router;

