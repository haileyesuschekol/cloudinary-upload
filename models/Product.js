const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  price: {
    type: Number,
    required: true,
    maxLength: 20,
  },
  image: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model("product", productSchema)
