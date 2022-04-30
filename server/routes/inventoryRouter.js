const express = require("express");

const router = express.Router();

const inventoryController = require("../controller/inventoryController");

//api
router.post('/api/inventory', inventoryController.create);
router.get('/api/inventory', inventoryController.findAll);
// router.get('/api/inventory/:id', inventoryController.findOne);
router.put('/api/inventory/:id', inventoryController.update);
router.delete('/api/inventory/:id', inventoryController.delete);


module.exports = router;
