import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState(null)

    // Update state variables on input change
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  // Get all blogs
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [blogs])

  // Saves user to local storage for ease of use
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setErrorMessage(`Successful login, welcome ${user.name}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }
  
  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setErrorMessage(`Successfully logged out, goodbye ${user.name}`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
    setUser(null)
  }
  
  const handleNewBlog = async (event) => {
    event.preventDefault();

    const tempBlog = {
      "title": title,
      "author": author,
      "url": url
    }

    // Use the values as needed, for example, call the newBlog function
    try {
      await blogService.create(tempBlog)
      setErrorMessage(`a new blog ${title} by ${author} added`)
    } catch (error) {
      setErrorMessage("Error adding blog")
    }
    
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
    
    setTitle('')
    setAuthor('')
    setUrl('')
  };

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
  )

  const newBlogForm = () => (
    <div style={{ marginBottom: '10px' }}>
      <h2> create new </h2>

      <form onSubmit={handleNewBlog}>
        <div>
          <div>title <input type="text" value={title} onChange={handleTitleChange} /></div>
          <div>author <input type="text" value={author} onChange={handleAuthorChange} /></div>
          <div>url <input type="text" value={url} onChange={handleUrlChange} /></div>
        </div>
        <button>create</button>
      </form>
    </div>
  )

  return (
    <div >
      <h2>Blogs</h2>
      <div style={{ marginBottom: '10px' }} >
        {errorMessage}
      </div>
      {/* If user is not logged in */}
      {user === null && loginForm()}

      {/* If user is logged in */}
      {user && (
        <div>  
          <div style={{ marginBottom: '10px' }}>
            {user.username} is logged in 
            <button onClick={logOut}>
              logout
            </button>
          </div>
          {newBlogForm()}
          <div>
            {/* Display all blogs */}
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      )}
    </div>
  )}

export default App