import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs( blogs ) )

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON){
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const userBlogs = user
  ? blogs.filter(blog => blog.user?.id === user.id)
  : []


  const handleForm = async(event) => {
    event.preventDefault()
    try{
      const res = await blogService.login(username, password)
      
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(res)
      )

      setUser(res)
      blogService.setToken(res.token)
    } catch(error) {
      console.log(error)
    }
  }

  const handlePost = (event) => {
    event.preventDefault()
    blogService.postData(title, author, url)
    .then(() => {
      setTitle("")
      setAuthor("")
      setUrl("")
    })
  }

  return (
    <div>
        {!user &&
          <div>
            <h2>log in to application</h2>
            <form onSubmit={handleForm}>
            <label>
              username
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </label>
            <br/>
            <label>
              password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>
            <br/>
            <button type="submit">login</button>
          </form>
        </div>
      }

      {user &&
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p> <br/>

          <h2>create new</h2>
          <form onSubmit={handlePost}>
            <label>
              title:
              <input
                type="text"
                value={title}
                onChange={(event)=>{setTitle(event.target.value)}}
                required  
              />
            </label> <br/>
            <label>
              author:
              <input
                type="text"
                value={author}
                onChange={(event)=>{setAuthor(event.target.value)}}
                required  
              />
            </label> <br/>
            <label>
              url:
              <input
                type="text"
                value={url}
                onChange={(event)=>{setUrl(event.target.value)}}
                required  
              />
            </label> <br/>
            <button type="submit">create</button>
          </form>

            {userBlogs.map(blog => 
              <Blog key={blog.id} blog={blog}/>
            )}
        </div>
      }
    </div>
  )
}

export default App