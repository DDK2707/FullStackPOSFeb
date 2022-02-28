const mongoose = require('mongoose')
const router = require("../routes/productsRoute")

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

//method to search for product by name 
productSchema.statics.findByCredentials = async (name) => {
  const product = await Product.findOne ({ name });
  if (!product) {
    throw new Error ({ error: "No product exists with that name"});
  };
  return product;
}

const Product = mongoose.model('Product', productSchema)
module.exports = Product