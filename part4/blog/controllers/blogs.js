const blogRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/users')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async(request, response, next) => {
  console.log("Creating a new blog post")
  console.log("Request token in blog post:", request.token)
  if (!request.token){
    return response.status(401).json({error: 'token missing or invalid'})
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id){
    return response.status(401).json({error: 'token missing or invalid'})
  }

  try{
    const user = await User.findById(decodedToken.id)
    const blog = new Blog(request.body)
    blog.user = user._id
    const savedBlog = await blog.save()
    if (user._id){
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
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