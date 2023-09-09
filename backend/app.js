const express = require("express");
const app = express();
const cookieParse = require("cookie-parser")
const core = require("cors")
const fileUpload = require("express-fileupload")
const bodyParser = require("body-parser")
const dotenv = require("dotenv");
const requestLogger = require("node-requset-logger");

dotenv.config({ path: 'backend/config/config.env' })

const errorMiddleware = require("./middleware/error")

app.use(core());
app.use(express.json()); // This is a middleware that allows us to accept json data in the body
app.use(cookieParse());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload({
    useTempFiles: true,
    limits: {
        fileSize: 1024 * 1024 * 10 // 10MB
    }
}));
app.use(requestLogger());


const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
const orderRouter = require("./routes/orderRouter");
const paymentRouter = require("./routes/paymentRoute");

app.use("/api/v1", productRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", paymentRouter);


app.use(errorMiddleware);


module.exports = app;
