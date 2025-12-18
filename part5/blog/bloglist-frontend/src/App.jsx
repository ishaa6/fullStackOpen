import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userBlogs, setUserBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleForm = async(event) => {
    console.log(blogs)
    event.preventDefault()
    const res = await blogService.login(username, password)
    if (!res) console.log("invalid login credential")
    else {
      console.log(res)
      setUser(res)
      setUserBlogs(blogs.filter(blog => blog.user.id===res.id))
    }
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

            {userBlogs.map(blog => 
              <Blog key={blog.id} blog={blog}/>
            )}
        </div>
      }
    </div>
  )
}

export default App