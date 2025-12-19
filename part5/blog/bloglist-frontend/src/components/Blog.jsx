import blogService from '../services/blogs'
import { useState } from 'react'

const Blog = ({ blog, onDelete }) => {
  const [like, setLike] = useState(blog.likes)

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
    <div>
      <p style={{ margin: '4px 0' }}>{blog.url}</p>
      <p style={{ margin: '4px 0' }}>
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
      </button>
    </div>  
)}

export default Blog