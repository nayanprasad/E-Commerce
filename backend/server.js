const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const cloudinary = require('cloudinary').v2;


// Handle uncaught exceptions  eg: using variable which are not defined
process.on("uncaughtException", err => {
  console.log("Error: " + err.message);
  console.log("Shutting down the server due to uncaughtException");
  process.exit(1);
})

dotenv.config({ path: 'backend/config/config.env' })

connectDB();

// cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
});

const server = app.listen(process.env.PORT, () => {
  console.log("Server started on port " + process.env.PORT)
})


// unhandled promise rejection  eg: changing the uri for connecting to db (in dotenv file)
process.on("unhandledRejection", err => {
  console.log("Error: " + err.message);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  })
});





