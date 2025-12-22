import blogService from '../services/blogs'
import { useState } from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, onDelete }) => {
  const [like, setLike] = useState(blog.likes)
  const [visible, setVisible] = useState(false)

  const updateLike = () => {
    blogService.updateData(blog.id, like+1)
    .then(() => setLike(like+1))
  }

  const handleDelete = () => {
    const confirm = window.confirm(`Remove ${blog.title} by ${blog.author}`)
    if (!confirm) return

    blogService.deleteData(blog.id)
    .then(() => onDelete(blog.id))
  }

  return(
    <div style={{display:visible?'':'flex'}}>
      <div className='blog' style={{ margin: '4px 0', display:'flex'}}>
        <p className='title'>{blog.title}</p> 
        <p className='author'>{blog.author}</p>
      </div>

      <Togglable 
        className='blogDetails'
        buttonLabel='view'
        hideLabel='hide'
        visible = {visible} 
        setVisible={setVisible}
      >
          <p className='url' style={{ margin: '4px 0' }}>{blog.url}</p>
          <p className='like' style={{ margin: '4px 0' }}>
            {like}  
            <button onClick={updateLike}>
              like
            </button>
          </p>
          <p style={{ margin: '4px 0' }}>{blog.author}</p>
          <button
            style={{backgroundColor:'	#557ff3ff'}}
            onClick={handleDelete}
          >
              remove
          </button> <br/>
      </Togglable>
    </div>  
)}

export default Blog