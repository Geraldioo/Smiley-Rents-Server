const { Lodging, User, Type } = require("../models");

const cloudinary = require("cloudinary").v2       
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET,
  secure : true
});

class Controller {
  static async createLodging(req, res, next) {
    try {
      console.log(req.body, "<<<<");
      let authorID = req.user.id
      const {
        name,
        facility,
        roomCapacity,
        imgUrl,
        location,
        price,
        typeId
      } = req.body;
// console.log(authorID, "******");
      const lodging = await Lodging.create({
        name,
        facility,
        roomCapacity,
        imgUrl,
        location,
        price,
        typeId,
        authorId : authorID,
      });
      res.status(201).json(lodging);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getLodging(req, res, next) {
    try {
      const lodging = await Lodging.findAll({
        include: {
          model: User,
          attributes: ["email", "role", "phoneNumber", "address"],
        },
      });
      // console.log(lodging, "<<<< ini odging");
      res.status(200).json(lodging);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async getLodgingByID(req, res, next) {
    try {
      const { id } = req.params;
      const lodging = await Lodging.findOne({
        include: {
          model: User,
          attributes: ["email", "role", "phoneNumber", "address"],
        },
        where: {
          id: id,
        },
      });
      // console.log(lodging, "!!!!");
      if (!lodging) {
        throw { name: "NotFound" };
      } else {
        res.status(200).json(lodging);
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async updateLodging (req, res, next) {
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

      res
        .status(200)
        .json({ message: `Lodging with id: ${id} has been updated`, lodging });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteLodging(req, res, next) {
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

      res
        .status(200)
        .json({ message: `Lodging with id: ${id} success to delete` });
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  static async createType(req, res, next) {
    try {
      const { name } = req.body;

      const type = await Type.create({
        name,
      });
      res.status(201).json(type);
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  static async getType(req, res, next) {
    try {
      // console.log(Type, "!<!<!<!<");
      const type = await Type.findAll();
      res.status(200).json(type);
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  static async updateType(req, res, next) {
    try {
      const { id } = req.params;
      const findType = await Type.findByPk(id);

      if (!findType) throw { name: "NotFound", id };
      const { name } = req.body;
      const type = await findType.update({
        name,
      });
      res
        .status(200)
        .json({ message: `Type with id: ${id} has been updated`, type });
    } catch (error) {
     console.log(error);
     next(error)
    }
  }

  static async deleteType(req, res, next) {
    try {
      const { id } = req.params;
      const findType = await Type.findByPk(id);
      if (!findType) {
        throw { name: "NotFound", id };
      }
      await Type.destroy({
        where: {
          id: id,
        },
      });

      res
        .status(200)
        .json({ message: `Type with id: ${id} success to delete` });
    } catch (error) {
     console.log(error);
     next(error)
    }
  }

  static async updateImg(req, res, next){
    try {
      // console.log(req.file, ">>><<<<");
      const {id} = req.params
      const lodging = await Lodging.findByPk(id)
      if (!lodging) throw { name: "NotFound"};
      if (!req.file) throw { name: "MulterError"}
      
      // console.log(req.file, "<><><<>");
      const base64 = req.file.buffer.toString("base64")
      const url = `data:${req.file.mimetype};base64,${base64}`
      const result = await cloudinary.uploader.upload(url)
      await lodging.update({
        imgUrl: result.secure_url
      })
      res.status(200).json({message: `image ${lodging.name} success to update`})
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
  
}

module.exports = Controller;
