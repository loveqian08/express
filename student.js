var mongoose = require('mongoose')
// 连接数据库
mongoose.connect('mongodb://localhost/itcast', {useMongoClient: true})

var Schema = mongoose.Schema
var studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: Number,
    enum: [0, 1],
    default: 0
  },
  age: {
    type: Number
  },
  hobbies: {
    type: String
  },
  index: {
    type: Number
  }
})

module.exports = mongoose.model('Student', studentSchema)