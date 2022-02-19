const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.reduce(reducer, 0)
}


const favoriteBlog = (blogs) => {
  const favorite = blogs[0]
  const reducer = (favorite, blog) => {
    if (blog.likes > favorite.likes) return blog
    return favorite
  }
  return blogs.reduce(reducer, favorite)
}


const mostBlogs = (blogs) => {
  const amounts = lodash.map(lodash.countBy(blogs, 'author'), (value, key) => ({author: key, blogs: value}))
  const reducer = (most, author) => {
    if (most.blogs > author.blogs) return most
    return author
  }
  return amounts.reduce(reducer, amounts[0])
}


const mostLikes = (blogs) => {
  const reducerLikes = (sum, blog) => {
    return sum + blog
  }
  const likes = lodash.groupBy(blogs, 'author')
  const li = lodash.map(likes, (value, key) => ({author: key, likes: value.map(l => l.likes).reduce(reducerLikes, 0)}))
  const reducer = (most, author) => {
    if (most.likes > author.likes) return most
    return author
  }
  return li.reduce(reducer, li[0])
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog, 
  mostBlogs,
  mostLikes
}