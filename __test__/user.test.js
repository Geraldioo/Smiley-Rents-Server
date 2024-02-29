const request = require("supertest")
const app = require("../app")
const { User } = require("../models")

beforeAll(async () => {
    await User.bulkCreate([
        {
            email: "test@mail.com",
            password: "testing",
            role: "admin",
            phoneNumber: "test123456",
            address: "Jl.Testing"
        }
    ])
})

describe("POST /add-user", () => {
    test("add-user on success", async () => {
        const dummyData = {
            email: "user1@gmail.com",
            password: "user1"
        }

        const response = await request(app).post("/add-user").send(dummyData)

        expect(response.status).toBe(201)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("id", expect.any(Number))
        expect(response.body).toHaveProperty("email", dummyData.email)
    })
    test("throw error on unique add-user", async () => {
        const dummyData = {
            email: "test@mail.com",
            password: "testing"
        }

        const response = await request(app).post("/add-user").send(dummyData)

        
        // expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "email telah terdaftar")
    })
})

afterAll(async () => {
    await User.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})