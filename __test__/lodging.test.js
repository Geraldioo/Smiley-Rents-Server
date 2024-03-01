const request = require("supertest");
const app = require("../app");
const { User, Type, Lodging } = require("../models");
const { signToken } = require("../helper/jwt");
const { hasPass } = require("../helper/bcrypt");


let token;
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
    ]);
    token = signToken({
      id: user[0].id,
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
    // console.log(error);
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
        .set("Authorization", `Bearer ${token}`)
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
