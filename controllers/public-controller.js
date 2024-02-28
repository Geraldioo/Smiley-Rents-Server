const { Lodging, User, Type } = require("../models");

class Controller {
  static async getLodging(req, res, next) {
    try {
      const lodging = await Lodging.findAll();
      // console.log(lodging, "<<<< ini odging");
      res.status(200).json(lodging);
    } catch (error) {
      console.log(error.message);
      next(error)
    }
  }

  static async getLoadingByID(req, res, next){
    try {
      const { id } = req.params;
      const lodging = await Lodging.findByPk(id);
      // console.log(lodging, "!!!!");
      if (!lodging) {
        throw {name: "NotFound"}
      } else {
        res.status(200).json(lodging);
      }
    } catch (error) {
      console.log(error.message);
      next(error)
    }
  }
}

module.exports = Controller;
