const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const supertest = require("supertest")
const app = require("../app")
const User = require("../models/user")
const helper = require("./test_helper")

const api = supertest(app)
describe("user creation tests", () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash("secret", 10)
        const user = new User({ username: "root", name: "default", passwordHash })

        await user.save()
    })

    test("creation succeeds with a fresh username", async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: "talabaster",
            name: "Thomas Alabaster",
            password: "password",
        }

        await api
            .post("/api/users")
            .send(newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })

    test("user creation fails with less than 3 char username or password", async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: "ta",
            name: "test",
            password: "pa",
        }

        await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).not.toContain(newUser.username)
    })
})


afterAll(async () => {
    await mongoose.connection.close()
})