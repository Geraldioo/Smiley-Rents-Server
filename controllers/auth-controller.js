const { comparePassword } = require("../helper/bcrypt");
const { signToken } = require("../helper/jwt");
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
      // minta email dan password
      // kita cek inputnya benar atau tidak
      const { email, password } = req.body;
      if (!email) throw { name: "EmailRequired" };
      if (!password) throw { name: "PassRequired" };


      // CEK KE DB KITA EMAIL NYA
      const user = await User.findOne({where: {email: email}});
      if (!user) throw { name: "InvalidLogin" }

      // CEK PASSWORD BENAR ATAU TIDAK
      const checkPass = comparePassword(password, user.password)
      if (!checkPass) throw { name: "InvalidLogin" }

      // BIKININ SI TOKEN
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
