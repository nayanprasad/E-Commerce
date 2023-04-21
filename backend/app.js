const express = require("express");
const app = express();
const cookieParse = require("cookie-parser")

const errorMiddleware = require("./middleware/error")

app.use(express.json()); // This is a middleware that allows us to accept json data in the body
app.use(cookieParse());

const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
const orderRouter = require("./routes/orderRouter");

app.use("/api/v1", productRouter);
app.use("/api/v1", userRouter);
app.use("api/v1", orderRouter);

// middleware for errors
app.use(errorMiddleware);


module.exports = app;