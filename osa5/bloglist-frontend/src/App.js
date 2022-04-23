import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => parseInt(b.likes) - parseInt(a.likes) ) ))
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const notify = (message, type='info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  /*
  * Added page reloading after the notification timer is out, so that button to remove blog appears
  */
  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        notify(
          `A new blog '${blogObject.title}' by '${blogObject.author}' has been added`
        )
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      })
    setTimeout(() => {
      window.location.reload(true)
    }, 3000)
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBloglistAppUser', JSON.stringify(user)
      )
      setUsername('')
      setPassword('')
    } catch (exception) {
      notify('wrong username or password', 'alert')
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }


  const logoutUser = () =>  {
    localStorage.removeItem('loggedBloglistAppUser')
    blogService.setToken(false)
    setUser(null)
  }


  const addLike = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }
    const returnedBlog = await blogService.update(id, changedBlog)
    setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
  }


  /*
  * Added page reloading after the notification timer is out, so that the blog is removed from the screen
  * as it is from the database
  */
  const removeBlog = async (id) => {
    const blog = blogs.find(b => b.id === id)
    if(window.confirm(`Delete ${blog.title} ?`)) {
      await blogService.remove(id)
      notify(`Removed ${blog.title}`)
      setTimeout(() => {
        setNotification(null)
      }, 3000)
      setBlogs(blogs)
    }
    setTimeout(() => {
      window.location.reload(true)
    }, 3000)
  }

  /*
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )*/

  /*
  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        title:
          <input
          type="title"
          value={newTitle}
          name="Title"
          onChange={({ target }) => setNewTitle(target.value)}
        />
      </div>
      <div>
        author:
          <input
          type="author"
          value={newAuthor}
          name="Author"
          onChange={({ target }) => setNewAuthor(target.value)}
        />
      </div>
      <div>
        url:
          <input
          type="url"
          value={newUrl}
          name="Url"
          onChange={({ target }) => setNewUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )*/


  if (user === null) {
    return (
      <div>
        <h2> Log in to application </h2>
        <Notification notification={notification} />
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />

      <div>
        <p>{user.name} logged in
          <button onClick={() => logoutUser()}>
            logout
          </button>
        </p>
        <h2>create new</h2>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} addLike={addLike} removeBlog={removeBlog} />
      )}
    </div>
  )
}

export default App
