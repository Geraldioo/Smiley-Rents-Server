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
        email: "test2@gmail.com",
        password: "test2",
        role: "Staff",
        phoneNumber: "test123456",
        address: "surga",
      },
    ]);
    tokenAdmin = signToken({
      id: 1,
    });
    tokenStaff = signToken({
      id: 2,
    });

    await Type.bulkCreate([
      {
        name: "Regular",
      },
      {
        name: "Premium",
      },
      {
        name: "Luxury",
      },
    ]);

    for (let i = 1; i <= 20; i++){
    await Lodging.bulkCreate([
      {
        name: "Oyo",
        facility: "Swimming Pool, Gym, Restaurant, Cafe, Rooftop, Playground",
        roomCapacity: 6,
        imgUrl:
          "https://tse2.mm.bing.net/th?id=OIP.xgXRB7T0cEhUFBYtPOu4CgHaFj&pid=Api&P=0&h=180",
        location: "Cilandak",
        price: 300000,
        typeId: 1,
        authorId: 1,
      },
    ]);
    }
  } catch (error) {
    console.log(error);
  }
});

describe("GET /pub/lodgings", () => {
  test("success get data without query", async () => {
    const response = await request(app).get("/pub/lodgings");

    //   console.log(response.body, "<<<< ini respon public");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("page", expect.any(Number));
    expect(response.body).toHaveProperty("totalData", expect.any(Number));
    expect(response.body).toHaveProperty("totalPage", expect.any(Number));
    expect(response.body).toHaveProperty("dataPerPage", expect.any(Number));
    expect(response.body).toHaveProperty("data", expect.any(Array));
  });

  test("success get data wuth query", async () => {
    const response = await request(app).get("/pub/lodgings?filterBy=1");

    // console.log(response.body, "<<<< ini respon public");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("page", expect.any(Number));
    expect(response.body).toHaveProperty("totalData", expect.any(Number));
    expect(response.body).toHaveProperty("totalPage", expect.any(Number));
    expect(response.body).toHaveProperty("dataPerPage", expect.any(Number));
    expect(response.body).toHaveProperty("data", expect.any(Array));
  });

  test("success get data with pagination", async () => {
    const response = await request(app).get(
      "/pub/lodgings?page=1"
    );

    // console.log(response.body, "<<<< ini respon public");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("page", expect.any(Number));
    expect(response.body).toHaveProperty("totalData", expect.any(Number));
    expect(response.body).toHaveProperty("totalPage", expect.any(Number));
    expect(response.body).toHaveProperty("dataPerPage", expect.any(Number));
    expect(response.body).toHaveProperty("data", expect.any(Array));
  });
});

describe("GET /pub/lodgings/:id", () => {
    test("success get data by id", async () => {
      const response = await request(app).get("/pub/lodgings/1");
  
    // console.log(response.body, "<<<< ini respon public");
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("name", expect.any(String));
      expect(response.body).toHaveProperty("imgUrl", expect.any(String));
      expect(response.body).toHaveProperty("price", expect.any(Number));
    });
  
    test("failed get data by id", async () => {
      const response = await request(app).get("/pub/lodgings/50");
  
    //console.log(response.body, "<<<< ini respon public");
      expect(response.status).toBe(404);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "error not found");
    });
  });

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
