const Product = require("../models/userModel")

//create and save product
exports.create = (req, res) => {
    // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Tutorial
  const product = new Product({
    name: req.body.name,
    category: req.body.category,
    image: req.body.image,
    price: req.body.price
  });
  // Save Product in the database
  product
    .save(product)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    });
};

//find all products
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
    Product.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving products."
        });
      });
}

//find single product with id
exports.findOne = (req, res) => {
    const id  = req.params.id;
    Product.findById(id)
        .then(data => {
            if(!data)
                res.status(404).send({ message: "Did not find Product with that ID" + id});
            else res.send(data)
        })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving Product with ID" + id});
        });
};

//update product by id in request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Please enter data to update" });
    }
    const id = req.params.id;
    Product.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if(!data) {
                res.status(404).send({ message: `Cannot update Product with ID=${id}. Product possibly not found in database`});
            } else res.send({ message: "Product updated successfully" });
        })
        .catch(err => {
            res.status(500).send({ message: "Error updating Product with ID" + id});
        });
};

//delete product with id in request
exports.delete = (req, res) => {
    const id = req.params.id;
    Product.findByIdAndRemove(id)
        .then(data => {
            if(!data) {
                res.status(404).send({ message: `Cannot delete Product with ID=${id}. Product possibly not found in database`});
            }
            else {
                res.send({ message: "Product was deleted successfully" });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Could not delete Product with id=" + id})
        })
};