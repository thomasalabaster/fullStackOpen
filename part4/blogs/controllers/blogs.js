const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

// Get all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

// Get blog by ID
blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

// Create new Blog
blogsRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body

  // Check if missing title or url
  if (!body.title || !body.url) {
    return response.status(400).json({ error: "Title and URL are required" })
  }

  // Find user obj associated with token
  const user = await User.findById(request.user)

  // Create new Blog post
  const blog = new Blog({
    title: body.title,
    url: body.url,
    likes: body.likes,
    user: user.id
  })

  // Save new blog
  const savedBlog = await blog.save()

  // Append blog to user
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)
})

// Update likes
blogsRouter.put("/:id", async (request, response) => {
  const { id } = request.params
  const { likes } = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(
    id , { likes }, { new: true }
  )
  response.status(204).json(updatedBlog)
})

// Delete specific blog by ID
blogsRouter.delete("/:id", userExtractor, async (request, response) => {

  // Get blog
  const blog = await Blog.findById(request.params.id)

  // Compare token with blog, ensure only user who created can delete
  if (!request.user === blog.user.toString())
  {
    return response.status(401).json({ error: 'token invalid' })
  }

  // Delete blog post and return 204
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter