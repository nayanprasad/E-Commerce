const express = require("express");
const app = express();
const cookieParse = require("cookie-parser")
const core = require("cors")
const fileUpload = require("express-fileupload")
const bodyParser = require("body-parser")
const morgan = require('morgan')

const errorMiddleware = require("./middleware/error")

app.use(core());
app.use(express.json()); // This is a middleware that allows us to accept json data in the body
app.use(cookieParse());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());
app.use(morgan('combined'));
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next(); // Call the next middleware or route handler
});

const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
const orderRouter = require("./routes/orderRouter");

app.use("/api/v1", productRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", orderRouter);

// middleware for errors
app.use(errorMiddleware);


module.exports = app;
