const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const CatchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require('cloudinary').v2;

// Create new product   --Admin
exports.createProduct = CatchAsyncErrors(async (req, res, next) => {

    // req.body.user = req.user.id  // if add login user to 'req.user' while login (in auth middle ware). so we are making the user property of model to the id of the user who is logged in

    const {name, price, description, category, stock} = req.body;

    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(images[i], {
            folder: "products",
            width: 150,
            crop: "scale"
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }


    const product = await Product.create({
        user: req.user.id,
        name,
        price,
        description,
        category,
        stock,
        images: imagesLinks,
    })

    res.status(200).json({
        success: true,
        product
    })
});


// Get all products
exports.getAllProducts = CatchAsyncErrors(async (req, res, next) => {

    // return next(new ErrorHandler("test error", 500))

    const resultPerPage = 6;

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()

    const filteredProductsCount = await Product.countDocuments(apiFeature.query); // this will count the total number of documents in the collection

    apiFeature.pagination(resultPerPage);

    const products = await apiFeature.query;  // apiFeature is the same class and search() will return the new obj ,
    const productsCount = await Product.countDocuments(); // this will count the total number of documents in the collection
    res.status(200).json({
        success: true,
        productsCount,
        filteredProductsCount,
        products,
        resultPerPage
    })
});

//get all product -- admin
exports.getAllProductsAdmin = CatchAsyncErrors(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    })
})


// Get single product details
exports.getSingleProduct = CatchAsyncErrors(async (req, res, next) => {

    // return next(new ErrorHandler("test error", 500))

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        product
    })
});


// Update the product  --Admin
exports.updateProduct = CatchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    console.log(req.body)

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    const updatedData = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        stock: req.body.stock,
    }

    let oldImages = product.images;

    if(req.body.imagesToDelete) {
        oldImages = oldImages.filter(img => !req.body.imagesToDelete.includes(img.public_id));
        updatedData.images = [...oldImages];
    }


    if (req.body.images) {
        let images = [];

        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        } else {
            images = req.body.images;
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.uploader.upload(images[i], {
                folder: "products",
                width: 150,
                crop: "scale"
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        updatedData.images = [...oldImages, ...imagesLinks];
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedData, {
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

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.uploader.destroy(product.images[i].public_id);
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

    if (isReviewed) {
        product.reviews.forEach(rev => {
            if (rev.user.toString() === req.user.id.toString()) {
                rev.comment = comment;
                rev.rating = rating;
            }
        });
    } else {
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

    if (!product)
        return next(new ErrorHandler("product  not found", 404));

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
});


//delete product review
exports.deleteProductReview = CatchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product)
        return next(new ErrorHandler("product  not found", 404));

    const reviews = product.reviews.filter((rev) => {
        rev._id.toString() !== req.query.reviewId.toString();
    });


    let avg = 0;
    reviews.forEach((rev) => avg += rev.rating);
    const ratings = avg ? avg / reviews.length : 0;
    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false
        }
    );

    res.status(200).json({
        success: true,
    })
})
