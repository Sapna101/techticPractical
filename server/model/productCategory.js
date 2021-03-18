let mongoose = require('mongoose')

let productCategorySchema = new mongoose.Schema({
  name : { type: String }  
})

module.exports = mongoose.model('productCategory', productCategorySchema)
