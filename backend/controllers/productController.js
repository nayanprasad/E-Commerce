const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const CatchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const {json} = require("express");


// Create new product   --Admin
exports.createProduct = CatchAsyncErrors( async (req, res, next) => {

  req.body.user = req.user.id  // if add login user to 'req.user' while login (in auth middle ware). so we are making the user property of model to the id of the user who is logged in

  const product = await Product.create(req.body);

  res.status(200).json({
    success: true,
    product
  })
});


// Get all products
exports.getAllProducts = CatchAsyncErrors( async (req, res, next) => {

  const resultPerPage = 5;

  const apiFeature = new ApiFeatures(Product.find(), req.query)
  .search()
  .filter()
  .pagination(resultPerPage);

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


// add/update review
exports.addProductReview = CatchAsyncErrors(async (req, res, next) => {

  const {rating, comment, productId} = req.body;

  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment
  }

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user.id.toString());

  if(isReviewed) {
    product.reviews.forEach( rev => {
      if(rev.user.toString() === req.user.id.toString()) {
        rev.comment = comment;
        rev.rating = rating;
      }
    });
  }
  else{
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;
  product.reviews.forEach((rev) => avg += rev.rating);
  product.ratings = avg / product.reviews.length;

  await product.save({validateBeforeSave: false});

  res.status(200).json({
    success: true
  });
});


//get all  reviews
exports.getProductReview = CatchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id)

  if(!product)
    return next(new ErrorHandler("product  not found", 404));

  res.status(200).json({
    success: true,
    reviews: product.reviews
  })
});
