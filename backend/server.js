const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/database");

dotenv.config({path: 'backend/config/config.env'})

connectDB();


app.listen(process.env.PORT, () => {
  console.log("Server started on port " + process.env.PORT)
})
