import React, {  useState } from 'react'
import Blog from '../components/Blog'
import blogsService from '../services/blogs'


const Blogs = ({blogs, setBlogs, setNotificationMessage }) => {
  const [newFilter, setNewFilter] = useState("")
  const [showAll, setShowAll] = useState()

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

 
  const deleteBlog = (id, title) => {
    window.confirm(`Delete ${title} ?`)
    blogsService
      .remove(id)
      .then(returnedBlog => {
        setNotificationMessage(
          `Removed '${title}'`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 3000)
        setBlogs(blogs)
      })
  }

  const blogsToShow = showAll
    ? blogs
    : blogs.filter(blog =>(blog.title.toLowerCase().includes(newFilter.toLowerCase()) || 
    (blog.author.includes(newFilter))))

  return (
    <div>
      filter shown with: <input 
        type="text"
        placeholder="Search"
        value={newFilter}
        onChange={handleFilterChange}
          />
      {blogsToShow.map(blog => 
        <Blog deleteBlog={() => deleteBlog(blog.id, blog.title)} 
          key={blog.title} title={blog.title} author={blog.author} url={blog.url} likes={blog.likes}
           />
      )}
    </div>
  )
}

export default Blogs