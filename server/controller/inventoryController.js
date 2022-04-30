const InventoryModel = require("../model/inventoryModel");

// create and save new inventory
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be emtpy!" });
    return;
  }

  const inventory = new InventoryModel({
    product_id: req.body.product_id,
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    price: req.body.price,
    stock: req.body.stock,
  });

  // save in the database
  inventory
    .save()
    .then(() => {
      res.status(200).send({ message: "inventory item added successfully" });
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message,
      });
    });
};

// retrieve  all inventories
exports.findAll = (req, res) => {
  InventoryModel.find()
    .then((data) => res.send(data))
    .catch((err) =>
      res
        .status(500)
        .send({ message: "Error Occurred while retrieving inventory items" })
    );
};

// Update a new idetified inventory by inventory id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }

  const id = req.params.id;

  InventoryModel.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update inventory with ${id}. Maybe inventory not found!`,
        });
      } else {
        if (req.body.product_id) {
          data.product_id = req.body.product_id;
        }

        if (req.body.name) {
          data.name = req.body.name;
        }

        if (req.body.description) {
          data.description = req.body.description;
        }

        if (req.body.stock) {
          data.stock = req.body.stock;
        }

        if (req.body.category) {
          data.category = req.body.category;
        }

        if (req.body.price) {
          data.price = req.body.price;
        }

        data
          .save()
          .then((item) => {
            res.status(200).send({ message: "item updated successfully" });
          })
          .catch((err) => {
            res.status(400).send({ message: "item update not possible" });
          });
      }
    })
    .catch((err) => res.status(400).send({ message: err.message }));
};

// Delete a inventory with specified inventory id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  InventoryModel.deleteOne({ _id: id })
    .then((item) =>
      res.status(200).send({ message: "item deleted successfully" })
    )
    .catch((err) => {
      res.status(400).send({
        message: "Could not delete Inventory with id=" + id,
      });
    });
};
