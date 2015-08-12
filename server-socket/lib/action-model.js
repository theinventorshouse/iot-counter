var mongoose = require('mongoose')
var Schema = mongoose.Schema

var counterSchema = new Schema({
  action: {
    type: String,
    enum: ['in', 'out']
  },
  created: {
    type: Date,
    default: Date.now
  }
})

var Counter = mongoose.model('User', counterSchema)

module.exports = Counter
