const mongoose = require("mongoose")
const supertest = require("supertest")
const helper = require("./test_helper")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")


beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})

test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs")

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test("a valid blog post can be added", async () => {
    const newBlog = {
        title: "Test",
        author: "Mr. Test",
        url: "https://testtesttest.com/",
        likes: 23,
    }

    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(b => b.title)
    expect(contents).toContain(
        "Test"
    )
})

test("blogs have id property", async() => {
    const response = await api.get("/api/blogs")

    const contents = response.body.map(r => r)
    expect(contents[0]).toHaveProperty("id")
})


afterAll(async () => {
    await mongoose.connection.close()
})