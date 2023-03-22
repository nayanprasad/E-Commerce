const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/database");

dotenv.config({ path: 'backend/config/config.env' })

connectDB();


const server = app.listen(process.env.PORT, () => {
  console.log("Server started on port " + process.env.PORT)
})


// unhandled promie rejection
process.on("unhandledRejection", err => {
  console.log("Error: " + err.message);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  })
} )