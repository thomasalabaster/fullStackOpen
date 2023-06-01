const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

// Get all blogs
blogsRouter.get("/", (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
    .catch(() => {
      console.log("not succesful")
    })
})

// Get specific blog by ID
blogsRouter.get("/:id", (request, response) => {
  Blog
    .findById(request.params.id)
    .then(blog => {
      response.json(blog)
    })
    .catch(() => {
      console.log("not succesful")
    })
})

// Create new Blog
blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body)
  // Check if missing title or url
  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: "Title and URL are required" })
  }

  const result = await blog.save()
  response.status(201).json(result)
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
blogsRouter.delete("/:id", async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter