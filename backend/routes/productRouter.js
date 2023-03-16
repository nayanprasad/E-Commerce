const express = require("express");
const router = express.Router();
const { getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct } = require("../controllers/productController");


router.route("/products").get(getAllProducts);
router.route("/product/new").post(createProduct);
router.route("/product/:id").get(getSingleProduct).put(updateProduct).delete(deleteProduct);


module.exports = router;

