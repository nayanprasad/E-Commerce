const express = require("express");
const app = express();

app.use(express.json()); // This is a middleware that allows us to accept json data in the body

const productRouter = require("./routes/productRouter");

app.use("/api/v1", productRouter)


module.exports = app;