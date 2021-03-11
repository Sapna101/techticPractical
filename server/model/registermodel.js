let mongoose = require('mongoose')
// users collection schema
let registerSchema = new mongoose.Schema({
  email : { type: String ,  required: true},
  password : { type: String ,  required: true},
  username : { type: String ,  required: true}
})

module.exports = mongoose.model('Users', registerSchema)
