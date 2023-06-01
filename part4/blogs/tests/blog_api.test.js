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

test("a non-valid blog post attempt at adding", async () => {
    const newBlog = {
        author: "Missing Title",
        likes: 34,
    }

    const response = await api.post("/api/blogs").send(newBlog)

    expect(response.status).toBe(400)
    expect(response.headers["content-type"]).toMatch(/application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const titles = blogsAtEnd.map((blog) => blog.title)
    expect(titles).not.toContain("Missing Title")
})


test("if likes property is missing, defaults at 0", async () => {
    const response = await api.get("/api/blogs")
    const blogs = response.body.map((b) => ({ ...b, likes: b.likes || 0 }))

    blogs.forEach((blog) => {
        expect(blog.likes).toBeDefined()
        expect(blog.likes).toBeGreaterThanOrEqual(0)
    })
})

test("blogs have id property", async() => {
    const response = await api.get("/api/blogs")

    const contents = response.body.map(r => r)
    expect(contents[0]).toHaveProperty("id")
})


afterAll(async () => {
    await mongoose.connection.close()
})