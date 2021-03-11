let mongoose = require('mongoose')
// users collection schema
let userchatSchema = new mongoose.Schema({
  userid : { type: String },
  username : { type: String },
  messages : { type: Array }
})

module.exports = mongoose.model('Userchats', userchatSchema)
