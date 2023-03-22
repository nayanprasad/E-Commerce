const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  err.statuscode = err.statuscode || 500;
  err.message = err.message || "Internal Server Error";

  res.status(err.statuscode).json({
    success: false,
    // error: err.stack  //this will tell the exact position where the error occure
    message: err.message
  })
}