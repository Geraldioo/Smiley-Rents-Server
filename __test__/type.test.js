const request = require("supertest");
const app = require("../app");
const { User, Type, Lodging } = require("../models");
const { signToken } = require("../helper/jwt");
const { hasPass } = require("../helper/bcrypt");

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


describe("GET /types", () => {
    test("success get types", async () => {

        const response = await request(app)
        .get("/types")
        .set("Authorization", `Bearer ${tokenAdmin}`)

        // console.log(response.body, "<<< ini respon body");
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0)
    })

    test("haven't login yet", async () => {
        const response = await request(app)
        .get("/types")

        // console.log(response.body, "<<< ini respon body");
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", 'Invalid Token');
    }) 

    test("invalid token", async () => {
        const response = await request(app)
        .get("/types")
        .set("Authorization", `Bearer ${undefined}`)
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