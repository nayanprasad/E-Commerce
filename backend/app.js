const express = require("express");
const app = express();

const errorMiddleware = require("./middleware/error")

app.use(express.json()); // This is a middleware that allows us to accept json data in the body

const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter")

app.use("/api/v1", productRouter)
app.use("/api/v1", userRouter)


// middleware for errors
app.use(errorMiddleware);


module.exports = app;