import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {

    case 'INIT_BLOGS':
      return action.payload

    case 'CREATE_BLOG':
      return state.concat(action.payload)

    case 'LIKE_BLOG':
      return state.map(blog =>
        blog.id === action.payload.id ? action.payload : blog
      )

    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.payload)

    default:
      return state
  }
}

export default blogReducer

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      payload: blogs
    })
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.postData(
      blog.title,
      blog.author,
      blog.url
    )

    dispatch({
      type: 'CREATE_BLOG',
      payload: newBlog
    })
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const updatedBlog = await blogService.updateData(
      blog.id,
      blog.likes + 1
    )

    dispatch({
      type: 'LIKE_BLOG',
      payload: updatedBlog
    })
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    await blogService.deleteData(id)

    dispatch({
      type: 'DELETE_BLOG',
      payload: id
    })
  }
}
