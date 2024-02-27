const { User } = require("../models");

class ControllerAuth {
  static async addUser(req, res, next) {
    try {
      const user = await User.create(req.body);

      res.status(201).json({ message: "User created", user });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "EmailRequired" };
      if (!password) throw { name: "PassRequired" };

      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!user) throw { name: "InvalidLogin" }

      const payload = { id: user.id }
      const token = signToken(payload)

      res.status(200).json({message: "success login", token})
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = ControllerAuth;
