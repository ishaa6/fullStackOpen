import { useState, useEffect } from 'react'
import './index.css'
import {useDispatch} from 'react-redux'

import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Blog from './components/Blog'

const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
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
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: {
          message: `Welcome ${res.name}`,
          type: 'success'
        }
      })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)

    } catch(error) {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: {
          message: error?.response?.data?.error || 'login failed',
          type: 'error'
        }
      })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
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

      dispatch({
        type: 'SET_NOTIFICATION',
        payload: {
          message: `a new blog ${title} by ${author} added`,
          type: 'success'
        }
      })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
      
      setBlogs(blogs.concat(blogObj))
    })
    .catch(error => {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: {
          message: error?.response?.data?.error || 'failed to post',
          type: 'error'
        }
      })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    })
  }

  const handleDelete = (id) => {
    setBlogs(blogs.filter(blog => blog.id!==id))
  }

  const handleLike = (id) => {
    setBlogs(blogs.map(blog => 
      blog.id === id 
        ? { ...blog, likes: blog.likes + 1 } 
        : blog
    ))
  }

  return (
    <div>

        {!user &&
          <div>
            <h2>log in to application</h2>
            <Notification/>
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
          <Notification/>

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
                    onLike={handleLike}
                  />
              </div>
            )}

        </div>
      }
    </div>
  )
}

export default App