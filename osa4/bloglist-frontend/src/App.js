import './App.css';
import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import blogsService from './services/blogs'

function App() {
  const [ blogs, setBlogs ] = useState([]) 
  const [ newTitle, setNewTitle ] = useState('')
  const [ newAuthor, setNewAuthor ] = useState('')
  const [ newUrl, setNewUrl ] = useState('')
  const [ newLikes, setNewLikes ] = useState('')
  const [ notificationMessage, setNotificationMessage ] = useState(null)


  useEffect(() => {
    blogsService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  })


  const addBlog = (event, id) => {
    event.preventDefault()
    
    const blogObject = {
      title:  newTitle,
      author:  newAuthor,
      url:  newUrl,
      likes:  newLikes,
      id:  blogs.length + 1,
    }
    
    
    
    blogsService
      .create(blogObject)
      .then(returnedBlog => {
         setBlogs( blogs.concat(returnedBlog))
         setNewTitle('')
         setNewAuthor('')
         setNewUrl('')
         setNewLikes('')
        
        setTimeout(() => {
           setNotificationMessage(null)
        }, 3000)
      })
      .catch(error => {
        setNotificationMessage(`'${error.response.data.error}'`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 3000)
        console.log(error.response.data)
      })
  }


  const handleBlogChange = (event) => {
    setNewTitle(event.target.value)
  }


  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }


  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }


  const handleLikesChange = (event) => {
    setNewLikes(event.target.value)
  }
  
  
  return (
    <div>
      <h2>Bloglist</h2>
      <Notification message={notificationMessage} />
      <h3>Add a new blog</h3>
      <form onSubmit={addBlog}>
        <div>
          title: <input 
                  value={ newTitle }
                  onChange={ handleBlogChange } 
                />
        </div>
        <div>
          author: <input
                    value={ newAuthor }
                    onChange={ handleAuthorChange } />
        </div>
        <div>
          url: <input
                    value={ newUrl}
                    onChange={ handleUrlChange } />
        </div>
        <div>
          likes: <input
                    value={ newLikes}
                    onChange={ handleLikesChange } />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Blogs</h3>
        <Blogs blogs={blogs} setBlogs={setBlogs} 
        setNotificationMessage={setNotificationMessage} />
    </div>
  )
}

export default App