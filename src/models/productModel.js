const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  name: {type: String, required: true, unique: true },
  price: {type: Number, required: true},
  category: {type: String, required: true},
  quantity: {type:Number},
  description: {type: String}
})


module.exports = mongoose.model("productModel", productSchema);