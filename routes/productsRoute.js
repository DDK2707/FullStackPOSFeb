const express = require('express')
const express = require("express")
const router = express.Router()
const productController = require("../controller/productController");

router.post("/", productController.create);
router.get("/", productController.findAll);
router.get("/")
module.exports = router