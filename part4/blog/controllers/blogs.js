const blogRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/users')

blogRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async(request, response, next) => {
  try{
    const blog = new Blog(request.body)
    const userId = request.user
    blog.user = userId
    const savedBlog = await blog.save()
    if (userId){
      const user = await User.findById(userId)
      if (user){
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
      }
    }
    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

blogRouter.delete('/:id', async(request, response, next) => {
  try{
    const id = request.params.id
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogRouter.put('/:id', async(request, response, next) => {
  try{
    const id = request.params.id
    const updatedBlog = await Blog.findByIdAndUpdate(id, request.body, { new: true })
    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogRouter