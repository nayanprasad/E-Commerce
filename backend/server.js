const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/database");


// Handle uncaught exceptions  eg: useing variable which are not defined
process.on("uncaughtException", err => {
  console.log("Error: " + err.message);
  console.log("Shutting down the server due to uncaughtException");
  process.exit(1);
})


dotenv.config({ path: 'backend/config/config.env' })

connectDB();


const server = app.listen(process.env.PORT, () => {
  console.log("Server started on port " + process.env.PORT)
})


// unhandled promie rejection  eg: changing the uri for connecting to db
process.on("unhandledRejection", err => {
  console.log("Error: " + err.message);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  })
})