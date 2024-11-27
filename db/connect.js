require("dotenv").config()
const mongoose = require("mongoose")

const connectDB = () => {
  return mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Db Connected!")
    })
    .catch((error) => console.log(error))
}

module.exports = connectDB
