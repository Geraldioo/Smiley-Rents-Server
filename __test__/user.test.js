const request = require("supertest");
const app = require("../app");
const { User } = require("../models");
const { signToken } = require("../helper/jwt");

let token;
beforeAll(async () => {
  try {
    let user = await User.bulkCreate([
        {
            email: "test@mail.com",
            password: "testing",
            role: "Admin",
            phoneNumber: "test123456",
            address: "Jl.Testing"
        }
    ])
    token =  signToken({
        "id": user[0].id
    })
    // console.log(token, user, "!!!!");
  } catch (error) {
    console.log(error);
  }
});

describe("POST /login", () => {
  // test.only("login success", async () => {
  //   const dummyData = {
  //     email: "test@mail.com",
  //     password: "testing",
  //   };
  //   console.log(dummyData, "dummy data >>>>>>>>>>");
  //   const response = await request(app).post("/login").send(dummyData);

  //   console.log(response.body, '<<<< ini body');
  //   expect(response.status).toBe(200);  
  // });
  test("throw error validation login (email)", async () => {
    const dummyData = {
      email: null && "",
      password: "testing",
    };

    const response = await request(app).post("/login").send(dummyData);
    // console.log(response.body, "<<<< ini respon body");
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty("message", 'Email is required')
  });
  test  ("throw error validation login (password)", async () => {
    const dummyData = {
      email: "test@mail.com",
      password: null && "",
    };

    const response = await request(app).post("/login").send(dummyData);
    console.log(response.body, "<<<< ini respon body");
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty("message", "Password is required")
  });
  test("throw error invalid login (email)", async () => {
    const dummyData = {
      email: "test222@mail.com",
      password: "testing",
    };

    const response = await request(app).post("/login").send(dummyData);
    // console.log(response.body, "<<<< ini respon body");
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty("message")
  });
  test("throw error invalid login (password)", async () => {
    const dummyData = {
      email: "test@mail.com",
      password: "testing222",
    };

    const response = await request(app).post("/login").send(dummyData);
    // console.log(response.body, "<<<< ini respon body");
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty("message")
  });
});

describe("POST /add-user", () => {
  test("add-user on success", async () => {
    const dummyData = {
      email: "user1@gmail.com",
      password: "user1",
      phoneNumber: 12345,
      address: "cipete",
    };

    const response = await request(app)
      .post("/add-user")
      .set("Authorization", `Bearer ${token}`)
      .send(dummyData);

      console.log(response.body, '<<<< ini body');
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.user).toHaveProperty("email");
  });
  test("throw error validation null add-user (email)", async () => {
    const dummyData = {
      email: null,
      password: "user1",
      phoneNumber: 12345,
      address: "cipete",
    };

    const response = await request(app).post("/add-user").set("Authorization", `Bearer ${token}`).send(dummyData);
    // console.log(response.body, "<<<< ini respon body");
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty("message", "email can't be null")
  });
  test("throw error validation null add-user (password)", async () => {
    const dummyData = {
      email: "user1@gmail.com",
      password: null,
      phoneNumber: 12345,
      address: "cipete",
    };

    const response = await request(app).post("/add-user").set("Authorization", `Bearer ${token}`).send(dummyData);
    // console.log(response.body, "<<<< ini respon body");
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty("message", "password can't be null")
  });
  test("throw error validation empty add-user (email)", async () => {
    const dummyData = {
      email: "",
      password: "user1",
      phoneNumber: 12345,
      address: "cipete",
    };

    const response = await request(app).post("/add-user").set("Authorization", `Bearer ${token}`).send(dummyData);
    // console.log(response.body, "<<<< ini respon body");
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty("message", "email can't be empty")
  });
  test("throw error validation empty add-user (password)", async () => {
    const dummyData = {
      email: "user1@gmail.com",
      password: "",
      phoneNumber: 12345,
      address: "cipete",
    };

    const response = await request(app).post("/add-user").set("Authorization", `Bearer ${token}`).send(dummyData);
    // console.log(response.body, "<<<< ini respon body");
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty("message", "password can't be empty")
  });
  // test.only("throw error unique constraint add-user (email)", async () => {
  //   const dummyData = {
  //     email: "test@mail.com",
  //     password: "testing",
  //     phoneNumber: "test123456",
  //     address: "Jl.Testing"
  //   };

  //   const response = await request(app).post("/add-user").set("Authorization", `Bearer ${token}`).send(dummyData);
  //   console.log(response.body, "<<<< ini respon body");
  //   expect(response.status).toBe(400);
  //   expect(response.body).toBeInstanceOf(Object)
  //   // expect(response.body).toHaveProperty("message", "email can't be empty")
  // });
  test("throw error validation email format add-user (email)", async () => {
    const dummyData = {
      email: "user1",
      password: "user1",
      phoneNumber: 12345,
      address: "cipete",
    };

    const response = await request(app).post("/add-user").set("Authorization", `Bearer ${token}`).send(dummyData);
    // console.log(response.body, "<<<< ini respon body");
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty("message", "input must be email format")
  });
  test("throw error no token add-user (token)", async () => {
    const dummyData = {
      email: "user1@mail.com",
      password: "user1",
      phoneNumber: 12345,
      address: "cipete",
    };

    const response = await request(app).post("/add-user").send(dummyData);
    console.log(response.body, "<<<< ini respon body");
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty("message", "Invalid Token")
  });
  test("throw error invalid token add-user (token)", async () => {
    const dummyData = {
      email: "user1@mail.com",
      password: "user1",
      phoneNumber: 12345,
      address: "cipete",
    };

    const response = await request(app).post("/add-user").set("Authorization", `Bearer ${'ADAFfbafasub*@H7)9gs7abshvkzhayin'}`).send(dummyData);
    console.log(response.body, "<<<< ini respon body");
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty("message", 'Error Token')
  });

});

afterAll(async () => {
  await User.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});
