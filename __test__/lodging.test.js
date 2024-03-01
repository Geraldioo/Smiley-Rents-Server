const request = require("supertest");
const app = require("../app");
const { User, Type, Lodging } = require("../models");
const { signToken } = require("../helper/jwt");
const { hasPass } = require("../helper/bcrypt");
const path = require('path')
const fs = require('fs')
const filePath = path.resolve(__dirname, "./test.jpg");
const imageBuffer = fs.readFileSync(filePath);


let tokenAdmin;
let tokenStaff;
beforeAll(async () => {
  try {
    let user = await User.bulkCreate([
      {
        email: "test@mail.com",
        password: hasPass("testing"),
        role: "Admin",
        phoneNumber: "test123456",
        address: "Jl.Testing",
      },
      {
        "email": "test2@gmail.com",
        "password": "test2",
        "role": "Staff",
        "phoneNumber": "test123456",
        "address": "surga"
      }
    ]);
    tokenAdmin = signToken({
      id: 1,
    });
    tokenStaff = signToken({
      id: 2,
    });

    await Type.bulkCreate([
      {
        name: "Regular"
      },
      {
        name: "Premium"
      },
      {
        name: "Luxury"
      },
    ]);

    await Lodging.bulkCreate([
        {
          name: "Oyo",
          facility: "Swimming Pool, Gym, Restaurant, Cafe, Rooftop, Playground",
          roomCapacity: 6,
          imgUrl: "https://tse2.mm.bing.net/th?id=OIP.xgXRB7T0cEhUFBYtPOu4CgHaFj&pid=Api&P=0&h=180",
          location: "Cilandak",
          price: 300000,
          typeId : 1,
          authorId : 1
        }
       ])
  } catch (error) {
    console.log(error);
  }
});


describe("POST /lodgings", () => {
    // ============ berhasil create lodging
    test("create lodgings", async () => {
        const dummyData = {
            name: "RedDorz",
            facility: "Swimming Pool, Gym, Restaurant, Cafe, Rooftop, Playground",
            roomCapacity: 2,
            imgUrl: "https://tse1.mm.bing.net/th?id=OIP.CRrzC41ZBDmjBCr3IWsvjwHaE8&pid=Api&P=0&h=180",
            location: "Pondok Labu",
            price: 300000,
            typeId : 1,
            authorId : 1
        }

        const response = await request(app)
        .post("/lodgings")
        .set("Authorization", `Bearer ${tokenAdmin}`)
        .send(dummyData);

        // console.log(token, "<<<< ini token");    
        // console.log(response.body, "<<<< ini respon body");
        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("name", expect.any(String))
        expect(response.body).toHaveProperty("typeId", expect.any(Number))
        expect(response.body).toHaveProperty("authorId", expect.any(Number))
    })

    // ============ gagal create karna user belom login
    test("haven't login yet", async () => {
        const dummyData = {
            name: "RedDorz",
            facility: "Swimming Pool, Gym, Restaurant, Cafe, Rooftop, Playground",
            roomCapacity: 2,
            imgUrl: "https://tse1.mm.bing.net/th?id=OIP.CRrzC41ZBDmjBCr3IWsvjwHaE8&pid=Api&P=0&h=180",
            location: "Pondok Labu",
            price: 300000,
            typeId : 1,
            authorId : 1
        }

        const response = await request(app)
        .post("/lodgings")
        .send(dummyData);

        // console.log(response.body, "<<< ini respon body");
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", 'Invalid Token');
    }) 

     // ============ gagal create karna token invalid
     test("invalid token", async () => {
        const dummyData = {
            name: "RedDorz",
            facility: "Swimming Pool, Gym, Restaurant, Cafe, Rooftop, Playground",
            roomCapacity: 2,
            imgUrl: "https://tse1.mm.bing.net/th?id=OIP.CRrzC41ZBDmjBCr3IWsvjwHaE8&pid=Api&P=0&h=180",
            location: "Pondok Labu",
            price: 300000,
            typeId : 1,
            authorId : 1
        }

        const response = await request(app)
        .post("/lodgings")
        .set("Authorization", `Bearer ${undefined}`)
        .send(dummyData);

        // console.log(response.body, "<<< ini respon body");
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", 'Invalid Token');
    }) 

     // ============ gagal create karna req.body kosong
     test("fail create lodgings", async () => {
        const dummyData = {
            name: "",
            facility: "Swimming Pool, Gym, Restaurant, Cafe, Rooftop, Playground",
            roomCapacity: 2,
            imgUrl: "https://tse1.mm.bing.net/th?id=OIP.CRrzC41ZBDmjBCr3IWsvjwHaE8&pid=Api&P=0&h=180",
            location: "Pondok Labu",
            price: 300000,
            typeId : 1,
            authorId : 1
        }

        const response = await request(app)
        .post("/lodgings")
        .set("Authorization", `Bearer ${tokenAdmin}`)
        .send(dummyData);

        // console.log(response.body, "<<< ini respon body");
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message");
    }) 
})


describe("GET /lodgings", () => {
    test("success get lodgings", async () => {

        const response = await request(app)
        .get("/lodgings")
        .set("Authorization", `Bearer ${tokenAdmin}`)

        // console.log(response.body, "<<< ini respon body");
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0)
    })

    test("haven't login yet", async () => {
        const response = await request(app)
        .get("/lodgings")

        // console.log(response.body, "<<< ini respon body");
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", 'Invalid Token');
    }) 

    test("invalid token", async () => {
        const response = await request(app)
        .get("/lodgings")
        .set("Authorization", `Bearer ${undefined}`)
        // console.log(response.body, "<<< ini respon body");
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", 'Invalid Token');
    }) 
})

describe("GET /lodgings/:id", () => {
    test("success get lodgings by id", async () => {

        let id = 1
        const response = await request(app)
        .get(`/lodgings/${id}`)
        .set("Authorization", `Bearer ${tokenAdmin}`)

        // console.log(response.body, "<<< ini respon body");
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("id", id)
    })

    test("haven't login yet", async () => {
        let id = 1
        const response = await request(app)
        .get(`/lodgings/${id}`)

        // console.log(response.body, "<<< ini respon body");
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", 'Invalid Token');
    }) 

    test("invalid token", async () => {
        let id = 1
        const response = await request(app)
        .get(`/lodgings/${id}`)
        .set("Authorization", `Bearer ${undefined}`)
        // console.log(response.body, "<<< ini respon body");
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", 'Invalid Token');
    }) 

    test("failed get lodgings by id", async () => {

        let id = 6
        const response = await request(app)
        .get(`/lodgings/${id}`)
        .set("Authorization", `Bearer ${tokenAdmin}`)

        // console.log(response.body, "<<< ini respon body");
        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", 'error not found')
    })
})

describe("PUT /lodgings/:id", () => {
    test("success update lodgings by id", async () => {
        const dummyData = {
            name: "RedDorz",
            facility: "Swimming Pool, Gym, Restaurant, Cafe, Rooftop, Playground",
            roomCapacity: 2,
            imgUrl: "https://tse1.mm.bing.net/th?id=OIP.CRrzC41ZBDmjBCr3IWsvjwHaE8&pid=Api&P=0&h=180",
            location: "Pondok Labu",
            price: 300000,
            typeId : 1,
            authorId : 1
        }

        let id = 1
        const response = await request(app)
        .put(`/lodgings/${id}`)
        .set("Authorization", `Bearer ${tokenAdmin}`)
        .send(dummyData)

        // console.log(response.body, "<<< ini respon body");
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", expect.any(String))
        expect(response.body).toHaveProperty("lodging", expect.any(Object))
    })

    test("haven't login yet", async () => {
        const dummyData = {
            name: "RedDorz",
            facility: "Swimming Pool, Gym, Restaurant, Cafe, Rooftop, Playground",
            roomCapacity: 2,
            imgUrl: "https://tse1.mm.bing.net/th?id=OIP.CRrzC41ZBDmjBCr3IWsvjwHaE8&pid=Api&P=0&h=180",
            location: "Pondok Labu",
            price: 300000,
            typeId : 1,
            authorId : 1
        }

        let id = 1
        const response = await request(app)
        .put(`/lodgings/${id}`)
        .send(dummyData)

        // console.log(response.body, "<<< ini respon body");
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", 'Invalid Token');
    }) 

    test("invalid token", async () => {
        const dummyData = {
            name: "RedDorz",
            facility: "Swimming Pool, Gym, Restaurant, Cafe, Rooftop, Playground",
            roomCapacity: 2,
            imgUrl: "https://tse1.mm.bing.net/th?id=OIP.CRrzC41ZBDmjBCr3IWsvjwHaE8&pid=Api&P=0&h=180",
            location: "Pondok Labu",
            price: 300000,
            typeId : 1,
            authorId : 1
        }

        let id = 1
        const response = await request(app)
        .put(`/lodgings/${id}`)
        .set("Authorization", `Bearer ${undefined}`)
        .send(dummyData)
        // console.log(response.body, "<<< ini respon body");
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", 'Invalid Token');
    }) 

    test("failed update lodgings by id", async () => {
        const dummyData = {
            name: "RedDorz",
            facility: "Swimming Pool, Gym, Restaurant, Cafe, Rooftop, Playground",
            roomCapacity: 2,
            imgUrl: "https://tse1.mm.bing.net/th?id=OIP.CRrzC41ZBDmjBCr3IWsvjwHaE8&pid=Api&P=0&h=180",
            location: "Pondok Labu",
            price: 300000,
            typeId : 1,
            authorId : 1
        }
        let id = 6
        const response = await request(app)
        .get(`/lodgings/${id}`)
        .set("Authorization", `Bearer ${tokenAdmin}`)
        .send(dummyData)

        // console.log(response.body, "<<< ini respon body");
        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", 'error not found')
    })

    test("failed update lodgings unauthorized", async () => {
        const dummyData = {
            name: "RedDorz",
            facility: "Swimming Pool, Gym, Restaurant, Cafe, Rooftop, Playground",
            roomCapacity: 2,
            imgUrl: "https://tse1.mm.bing.net/th?id=OIP.CRrzC41ZBDmjBCr3IWsvjwHaE8&pid=Api&P=0&h=180",
            location: "Pondok Labu",
            price: 300000,
            typeId : 1,
            authorId : 1
        }

        let id = 1
        const response = await request(app)
        .put(`/lodgings/${id}`)
        .set("Authorization", `Bearer ${tokenStaff}`)
        .send(dummyData)

        // console.log(response.body, "<<< ini respon body");
        expect(response.status).toBe(403)
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", 'Forbidden')
       
    })

    test("failed update lodgings because empty req.body", async () => {
        const dummyData = {
            name: "",
            facility: "Swimming Pool, Gym, Restaurant, Cafe, Rooftop, Playground",
            roomCapacity: 2,
            imgUrl: "https://tse1.mm.bing.net/th?id=OIP.CRrzC41ZBDmjBCr3IWsvjwHaE8&pid=Api&P=0&h=180",
            location: "Pondok Labu",
            price: 300000,
            typeId : 1,
            authorId : 1
        }

        let id = 1
        const response = await request(app)
        .put(`/lodgings/${id}`)
        .set("Authorization", `Bearer ${tokenAdmin}`)
        .send(dummyData)

        // console.log(response.body, "<<< ini respon body");
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", expect.any(String))
    })
})


describe("DELETE /lodgings/:id", () => {
    test("success delete lodgings by id", async () => {

        let id = 1
        const response = await request(app)
        .delete(`/lodgings/${id}`)
        .set("Authorization", `Bearer ${tokenAdmin}`)

        // console.log(response.body, "<<< ini respon body");
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", `Lodging with id: ${id} success to delete`)
    })

    test("haven't login yet", async () => {
        let id = 2
        const response = await request(app)
        .delete(`/lodgings/${id}`)

        // console.log(response.body, "<<< ini respon body");
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", 'Invalid Token');
    }) 

    test("invalid token", async () => {
        let id = 2
        const response = await request(app)
        .delete(`/lodgings/${id}`)
        .set("Authorization", `Bearer ${undefined}`)
        // console.log(response.body, "<<< ini respon body");
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", 'Invalid Token');
    }) 

    test("failed delete lodgings by id", async () => {
        let id = 6
        const response = await request(app)
        .delete(`/lodgings/${id}`)
        .set("Authorization", `Bearer ${tokenAdmin}`)

        // console.log(response.body, "<<< ini respon body");
        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", 'error not found')
    })

    test("failed delete lodgings unauthorized", async () => {
        let id = 2
        const response = await request(app)
        .delete(`/lodgings/${id}`)
        .set("Authorization", `Bearer ${tokenStaff}`)

        console.log(response.body, "<<< ini respon body");
        expect(response.status).toBe(403)
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Forbidden")
    })
})

describe("PATCH /lodgings/:id", () => {
    test("success update imgUrl by id", async () => {
        let id = 2
        const response = await request(app)
        .patch(`/lodgings/${id}`)
        .set("Authorization", `Bearer ${tokenAdmin}`)
        .attach("image", imageBuffer, "test.jpg")

        // console.log(response.body, "<<<< ini respon body patch");
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", expect.stringContaining('image'))
    })

    test("haven't login yet", async () => {
        let id = 2
        const response = await request(app)
        .patch(`/lodgings/${id}`)
        .attach("image", imageBuffer, "test.jpg")

        // console.log(response.body, "<<< ini respon body");
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", 'Invalid Token');
    }) 

    test("invalid token", async () => {
        let id = 2
        const response = await request(app)
        .patch(`/lodgings/${id}`)
        .set("Authorization", `Bearer ${undefined}`)
        .attach("image", imageBuffer, "test.jpg")
        // console.log(response.body, "<<< ini respon body");
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", 'Invalid Token');
    })
    
    test("failed update image", async () => {
        let id = 10
        const response = await request(app)
        .patch(`/lodgings/${id}`)
        .set("Authorization", `Bearer ${tokenAdmin}`)
        .attach("image", imageBuffer, "test.jpg")

        // console.log(response.body, "<<< ini respon body");
        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", 'error not found')
    })
    
    test("failed update image unauthorized", async () => {
        let id = 2
        const response = await request(app)
        .patch(`/lodgings/${id}`)
        .set("Authorization", `Bearer ${tokenStaff}`)
        .attach("image", imageBuffer, "test.jpg")

        // console.log(response.body, "<<< ini respon body");
        expect(response.status).toBe(403)
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Forbidden")
    })

    test("failed update image empty req.body", async () => {
        // let id = 1
        let id = 2
        const response = await request(app)
        .patch(`/lodgings/${id}`)
        .set("Authorization", `Bearer ${tokenAdmin}`)

        console.log(response.body, "<<< ini respon body INI ERROR");
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message")
    })
})

afterAll(async () => {
  await User.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await Type.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });

  await Lodging.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});
