const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const CatchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");


// Create new product   --Admin
exports.createProduct = CatchAsyncErrors( async (req, res, next) => {

  const product = await Product.create(req.body);

  res.status(200).json({
    success: true,
    product
  })
});


// Get all products
exports.getAllProducts = CatchAsyncErrors( async (req, res, next) => {

  const apiFeature = new ApiFeatures(Product.find(), req.query).search();
  const products = await apiFeature.query;  // apiFeature is the same class and search() will return the new obj , 

  res.status(200).json({
    success: true,
    products
  })
});


// Get single product details
exports.getSingleProduct = CatchAsyncErrors( async (req, res, next) => {

  const product = await Product.findById(req.params.id);

  if(!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product
  })
});


// Update the product  --Admin
exports.updateProduct = CatchAsyncErrors( async (req, res, next) => {
  
  const product = Product.findById(req.params.id);

  if(!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // This will return the updated product
    runValidators: true, // This will validate the data
    useFindAndModify: false // This will use the new method of updating
  })

  res.status(200).json({
    success: true,
    updatedProduct

  })
});


// Delete product  --Admin
exports.deleteProduct = CatchAsyncErrors(async (req, res, next) => {

  const product = await Product.findById(req.params.id);

  if(!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await Product.findByIdAndDelete(req.params.id);  // since product.remove() is deprecated

  res.status(200).json({
    success: true,
    message: "Product is deleted",
  })
});
