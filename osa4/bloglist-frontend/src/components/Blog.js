import React from 'react'

const Blog = ({ title, author, url, likes }) => {

  return (
      <p>  
        {title} {author} {url} {likes}
      </p>
  )
}

export default Blog