const { Lodging, User, Type } = require("../models");

class Controller {
  static async createLodging(req, res) {
    try {
      console.log(req.body, "<<<<");
      const {
        name,
        facility,
        roomCapacity,
        imgUrl,
        location,
        price,
        typeId,
        authorId,
      } = req.body;
      
      const lodging = await Lodging.create({
        name,
        facility,
        roomCapacity,
        imgUrl,
        location,
        price,
        typeId,
        authorId,
      });
      res.status(201).json(lodging);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        res.status(400).json({
          message: error.errors[0].message,
        });
      } else {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async getLodging(req, res) {
    try {
      const lodging = await Lodging.findAll({
        include: {
          model: User,
          attributes: { exclude: ["password"] },
        },
      });
      // console.log(lodging, "<<<< ini odging");
      res.status(200).json(lodging);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getLodgingByID(req, res) {
    try {
      const { id } = req.params;
      const lodging = await Lodging.findOne({
        include: {
          model: User,
          attributes: { exclude: ["password"] },
        },
        where: {
          id: id,
        },
      });
      console.log(lodging, "!!!!");
      if (!lodging) {
        res.status(400).json({ message: "error not found" });
      } else {
        res.status(200).json(lodging);
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async updateLodging(req, res) {
    try {
      const { id } = req.params;

      const findLodging = await Lodging.findByPk(id);

      if (!findLodging) {
        throw { name: "NotFound", id };
      }

      const {
        name,
        facility,
        roomCapacity,
        imgUrl,
        location,
        price,
        typeId,
        authorId,
      } = req.body;
      // console.log(findLodging, "<<<<>>>>>");
      const lodging = await findLodging.update({
        name,
        facility,
        roomCapacity,
        imgUrl,
        location,
        price,
        typeId,
        authorId,
      });

      res.status(200).json({ message: "Lodging Updated", lodging});
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        res.status(400).json({
          message: error.errors[0].message,
        });
      } else if (error.name === "NotFound") {
        res.status(404).json({
          message: "error not found",
        });
      } else {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async deleteLodging(req, res) {
    try {
      const { id } = req.params;
      const findLodging = await Lodging.findByPk(id);
      if (!findLodging) {
        throw { name: "NotFound", id };
      }
      await Lodging.destroy({
        where: {
          id: id,
        },
      });

      res.status(200).json({ message: `Lodging with id: ${id} success to delete` });
    } catch (error) {
      if (error.name === "NotFound") {
        res.status(404).json({
          message: "error not found",
        });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async createType (req, res){
    try {
      const { name } = req.body

      const type = await Type.create({
        name
      })
      res.status(201).json(type)
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        res.status(400).json({
          message: error.errors[0].message,
        });
      } else {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async getType (req, res){
    try {
      console.log(Type, "!<!<!<!<");
      const type = await Type.findAll()
      res.status(200).json(type)
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = Controller;
