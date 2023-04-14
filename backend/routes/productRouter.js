const express = require("express");
const router = express.Router();
const { getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct } = require("../controllers/productController");
const {isAuthenticatedUser} = require("../middleware/auth");


router.route("/products").get(isAuthenticatedUser, getAllProducts);
router.route("/product/new").post(createProduct);
router.route("/product/:id").get(getSingleProduct).put(updateProduct).delete(deleteProduct);


module.exports = router;

