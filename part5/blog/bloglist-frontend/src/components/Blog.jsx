import blogService from '../services/blogs'
import { useState } from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, onDelete, onLike }) => {
  const [like, setLike] = useState(blog.likes)
  const [visible, setVisible] = useState(false)

  const updateLike = async() => {
    await blogService.updateData(blog.id, like+1)
    onLike(blog.id),
    setLike(like+1)

  }

  const handleDelete = () => {
    const confirm = window.confirm(`Remove ${blog.title} by ${blog.author}`)
    if (!confirm) return

    blogService.deleteData(blog.id)
    .then(() => onDelete(blog.id))
  }

  return(
    <div className='blog' style={{display:visible?'':'flex'}}>
      <div style={{ margin: '0px 4px', display:'flex'}}>
        <p className='title'>{blog.title}</p> 
        <p className='author' style={{marginLeft:'4px'}}>{blog.author}</p>
      </div>

      <Togglable 
        className='blogDetails'
        buttonLabel='view'
        hideLabel='hide'
        visible = {visible} 
        setVisible={setVisible}
      >
          <p className='url' style={{ margin: '0px 4px' }}>{blog.url}</p>
          <p className='like' style={{ margin: '4px 4px' }}>
            {like}  
            <button onClick={updateLike}>
              like
            </button>
          </p>
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