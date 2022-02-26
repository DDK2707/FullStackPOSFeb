const express = require('express')
const router = express.Router()
const Product = require('../models/product')

// Getting all
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getProduct, (req, res) => {
  res.json(res.Product)
})

// Creating one
router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    category: req.body.category,
    image: req.body.image,
    price: req.body.price
  })
  try {
    const newProduct = await product.save()
    res.status(201).json(newProduct)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:id', getProduct, async (req, res) => {
  if (req.body.name != null) {
    res.product.name = req.body.name
  }
  if (req.body.category != null) {
    res.product.category = req.body.category
  }
  if (req.body.image != null) {
    res.product.image = req.body.image
  }
  if (req.body.price != null) {
    res.product.price = req.body.price
  }
  try {
    const updatedProduct = await res.product.save()
    res.json(updatedProduct)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getProduct, async (req, res) => {
  try {
    await res.product.remove()
    res.json({ message: 'Deleted Product' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getProduct(req, res, next) {
  let product
  try {
    product = await Product.findById(req.params.id)
    if (product == null) {
      return res.status(404).json({ message: 'Cannot find product' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.product = product
  next()
}

module.exports = router