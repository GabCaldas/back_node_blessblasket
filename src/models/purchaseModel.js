const mongoose = require('mongoose')
const Schema = mongoose.Schema

const purchaseSchema = new Schema({
    products: [
        {
          name: { type: String, required: true },
          quantity: { type: Number, required: true },
        },
      ],
  })


module.exports = mongoose.model("purchaseModel", purchaseSchema);