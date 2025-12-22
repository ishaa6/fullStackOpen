import { useState, useEffect } from 'react'
import './index.css'

import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Blog from './components/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState(null)
  const [visible, setVisible] = useState(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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
  ? blogs
    .filter(blog => blog.user?.id === user.id)
    .sort((a,b) => b.likes-a.likes)
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

      setNotificationType('success')
      setNotification(`Welcome ${res.name}`)
      setTimeout(()=>setNotification(null),5000)
    } catch(error) {
      setNotificationType('error')
      setNotification(error?.response?.data?.error || 'login failed')
      setTimeout(()=>setNotification(null),5000)
    }
  }

  const handlePost = ({title, author, url}) => {
    event.preventDefault()
    blogService.postData(title, author, url)
    .then((newBlog) => {
      const blogObj = {
        ...newBlog,
        user: {
          id: user.id,
          name: user.name,
          username: user.username
        }
      }

      setNotificationType('success')
      setNotification(`a new blog ${title} by ${author} added`)
      setTimeout(()=>setNotification(null),5000)

      setBlogs(blogs.concat(blogObj))
    })
    .catch(error => {
      setNotification(error?.response?.data?.error || 'failed to post')
      setNotificationType('error')
      setTimeout(()=>setNotification(null),5000)
    })
  }

  const handleDelete = (id) => {
    setBlogs(blogs.filter(blog => blog.id!==id))
  }

  return (
    <div>

        {!user &&
          <div>
            <h2>log in to application</h2>
            <Notification
              message={notification}
              type={notificationType}
            />
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
          <h2>create new</h2>
          <Notification
                message={notification}
                type={notificationType}
          />

          {user.name} logged in 
          <button
            onClick={() => {
              window.localStorage.removeItem('loggedUser')
              blogService.setToken(null)
              setUser(null)
            }}
          >
            logout
          </button> <br/><br/>

          <Togglable 
            buttonLabel='create new blog'
            hideLabel='cancel'
            visible={visible}
            setVisible={setVisible}
          >
            <BlogForm
              handlePost={handlePost}
            />
          </Togglable>

            {userBlogs.map(blog => 
              <div 
                style={{border:'2px solid black', marginBottom:'5px'}}
                key={blog.id}
              >
                  <Blog 
                    key={blog.id} 
                    blog={blog}
                    onDelete={handleDelete}
                  />
              </div>
            )}

        </div>
      }
    </div>
  )
}

export default App