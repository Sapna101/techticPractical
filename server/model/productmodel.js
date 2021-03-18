let mongoose = require('mongoose')

let productSchema = new mongoose.Schema({
  name : { type: String },
  description : { type: String },
  uniquecode : { type: String },
  catagory_id : { type: String }
})

module.exports = mongoose.model('product', productSchema)
