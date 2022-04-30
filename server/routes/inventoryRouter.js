const express = require("express");

const router = express.Router();

const inventoryController = require("../controller/inventoryController");

//api
router.post('/', inventoryController.create);
router.get('/', inventoryController.findAll);
router.put('/:id', inventoryController.update);
router.delete('/:id', inventoryController.delete);


module.exports = router;
