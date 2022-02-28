const express = require('express')
const router = express.Router()
const productController = require("../controller/productController");
const auth = require("../config/auth")

router.post("/", auth, productController.create);
router.get("/", auth, productController.findAll);
router.get("/:id", auth, productController.findOne);
router.put("/:id", auth, productController.update);
router.delete("/:id", auth, productController.delete)

module.exports = router