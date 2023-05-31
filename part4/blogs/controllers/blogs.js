const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

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

blogsRouter.post("/", (request, response) => {
  const blog = new Blog(request.body)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})


module.exports = blogsRouter