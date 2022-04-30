const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const inventorySchema = new Schema({
  product_id: {
    type: String,
    required: true,
    unique : true,
    dropDups: true
  },

  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  price: {//per_quanitity
    type: Number,
    required: true,
    validate: {
        validator: (x) => x>0, 
        message: (props) => `${props.value} is not valid value`,
      },
  },
  stock: {
    type: Number,
    required: true,
    validate: {
        validator: (x) => x>=0, 
        message: (props) => `${props.value} is not valid value`,
      },
  },

});
module.exports = mongoose.model("inventory", inventorySchema);
