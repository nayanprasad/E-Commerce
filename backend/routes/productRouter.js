const express = require("express");
const router = express.Router();
const { getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct } = require("../controllers/productController");
const {isAuthenticatedUser, isAuthorizedRoles} = require("../middleware/auth");
const {getUser} = require("../controllers/userController");


router.route("/products").get(isAuthenticatedUser, getAllProducts);
router.route("/product/new").post(isAuthenticatedUser, isAuthorizedRoles("admin"), createProduct);
router.route("/product/:id")
    .get(getSingleProduct)
    .put(isAuthenticatedUser, isAuthorizedRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, isAuthorizedRoles("admin"), deleteProduct);
router.route("/me").get(isAuthenticatedUser, getUser);


module.exports = router;

