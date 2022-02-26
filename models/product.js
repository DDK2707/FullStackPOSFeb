const mongoose = require('mongoose')
const router = require("../routes/products")

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
      type: String,
      required: true
  },
  image: {
      type: String,
      required: true
  },
  price: {
      type: String,
      required: true
  }
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product