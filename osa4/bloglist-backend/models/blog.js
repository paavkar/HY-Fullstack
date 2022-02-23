const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    required: true,
    unique: false,
    sparse: true
  },
  author: {
    type: String,
    minlength: 3,
    required: true,
    unique: false
  },
  url: {
    type: String,
    minlength: 8,
    required: true,
    unique: false
  },
  likes: {
    type: Number,
    minlength: 1,
    required: true,
    unique: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.plugin(uniqueValidator)


blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)