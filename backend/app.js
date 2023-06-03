const express = require("express");
const app = express();
const cookieParse = require("cookie-parser")
const core = require("cors")
const fileUpload = require("express-fileupload")
const bodyParser = require("body-parser")

const errorMiddleware = require("./middleware/error")

app.use(core());
app.use(express.json()); // This is a middleware that allows us to accept json data in the body
app.use(cookieParse());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());

const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
const orderRouter = require("./routes/orderRouter");

app.use("/api/v1", productRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", orderRouter);

// middleware for errors
app.use(errorMiddleware);


module.exports = app;
