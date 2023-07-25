const express = require("express");
const app = express();
const cookieParse = require("cookie-parser")
const core = require("cors")
const fileUpload = require("express-fileupload")
const bodyParser = require("body-parser")
const morgan = require('morgan');


const errorMiddleware = require("./middleware/error")

app.use(core());
app.use(express.json()); // This is a middleware that allows us to accept json data in the body
app.use(cookieParse());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());
// app.use(morgan('combined'));


// ANSI escape sequences for colors and styles
const RESET = '\x1b[0m';
const LIGHT_GREEN = '\x1b[92m';
const YELLOW = '\x1b[33m';
const LIGHT_BLUE = '\x1b[94m';
const RED = '\x1b[31m';
const GRAYISH = '\x1b[37m';

// Middleware to log incoming requests with colored method and URL
app.use((req, res, next) => {
    const arrow = `${GRAYISH}==> `;
    const timestamp = new Date().toISOString();
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const method = req.method;
    const url = req.url;

    let methodColor;
    switch (method) {
        case 'GET':
            methodColor = LIGHT_GREEN;
            break;
        case 'POST':
            methodColor = YELLOW;
            break;
        case 'DELETE':
            methodColor = RED;
            break;
        case 'PUT':
            methodColor = LIGHT_BLUE;
            break;
        default:
            methodColor = RESET;
    }

    console.log(`\n${arrow}[${timestamp}] Incoming request: ${methodColor}${method}${RESET} ${GRAYISH}${url}${RESET} from ${ip}`);
    // console.log(`${GRAYISH}Headers:${RESET}`, req.headers);
    // console.log(`${GRAYISH}Body:${RESET}`, req.body);

    res.on('finish', () => {
        const statusCode = res.statusCode;
        let statusColor;
        if (statusCode >= 300) {
            statusColor = RED;
        } else {
            statusColor = LIGHT_GREEN;
        }
        console.log(`${GRAYISH}[${timestamp}] Response status: ${statusColor}${statusCode}${RESET}`);
    });

    next();
});



const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
const orderRouter = require("./routes/orderRouter");
const paymentRouter = require("./routes/paymentRoute");

app.use("/api/v1", productRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", paymentRouter);

// middleware for errors
app.use(errorMiddleware);


module.exports = app;
