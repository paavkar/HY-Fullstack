const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const url = process.env.MONGODB_URI

console.log('connecting to', url)


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then( () => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB: ', error.message)
  })

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
  }
})

blogSchema.plugin(uniqueValidator)


if (process.argv.length === 3) {
  console.log('bloglist:')
  Blog.find({}).then( result => {
    result.forEach(blog => {
      console.log(blog.title, blog.author, blog.url, blog.likes)
    })
    mongoose.connection.close()
  })
}

module.exports = mongoose.model('Blog', blogSchema)