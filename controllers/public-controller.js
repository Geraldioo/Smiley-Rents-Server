const { Lodging, User, Type } = require("../models");
const { Op, where } = require("sequelize");

class Controller {
  static async getLodging(req, res, next) {
    try {
      let { sort, search, page, filterBy } = req.query;
      let option = {
        include: Type,
      };

      if (search) {
        option.where = {
          name: {
            [Op.iLike]: `%${search}%`,
          },
        };
      }

      if (filterBy) {
        option.where = {
          typeId: {
            [Op.eq]: filterBy,
          },
        };
      }

      if (sort) {
        const ordering = sort[0] === "-" ? "DESC" : "ASC";
        const columnName = ordering === "DESC" ? sort.slice(1) : sort;
        option.order = [[columnName, ordering]];
      }

      // console.log(req.query, "<<<");
      let limit = 10;
      let pageNumber = 1;
      if (page) {
        if (page.size) {
          limit = +page.size;
          option.limit = limit;
        }

        if (page.number) {
          pageNumber = +page.number;
          option.offset = limit * (pageNumber - 1);
        }
      } else {
        option.limit = limit;
        option.offset = limit * (pageNum - 1);
      }

      const { count, rows } = await Lodging.findAndCountAll(option);
      res.status(200).json({
        page: pageNumber,
        data: rows,
        totalData: count,
        totalPage: Math.ceil(count / limit),
        dataPerPage: limit,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getLoadingByID(req, res, next) {
    try {
      const { id } = req.params;
      const lodging = await Lodging.findByPk(id);
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

  static async getLoadingType(req, res, next) {
    try {
      let { filterBy } = req.query;
      let option = {};

      if (filterBy) {
        option.where = {
          name: {
            [Op.like]: `%${filterBy}%`,
          },
        };
      }
      const lodgingType = await Type.findAll(option);
      res.status(200).json(lodgingType);
    } catch (error) {
      console.log(error.message, "<<<<<<");
      next(error);
    }
  }
}

module.exports = Controller;
