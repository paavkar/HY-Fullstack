import { useState } from 'react'


const Blog = ({ blog, user, addLike, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showIfTrue = { display: user.username === blog.user.username ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  return (
    <div style={blogStyle} className="partialInfo">
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={() => setVisible(true)}>
            view
        </button>
      </div>
      <div style={showWhenVisible} className="fullInfo">
        {blog.title} <button onClick={() => setVisible(false)}>
            hide
        </button>
        <p>{blog.url} </p>
        likes: {blog.likes} <button onClick={() => addLike(blog.id)}>like</button>
        <p>{blog.author} </p>
        <div style={showIfTrue}>
          <button onClick={() => removeBlog(blog.id)}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog