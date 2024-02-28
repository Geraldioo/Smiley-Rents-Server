const { Lodging } = require("../models");

const authorizationAdmin = async (req, res, next) => {
  try {
    // mau nge cek apkah user yang lagi login admin atau bukan
    if (req.user.role !== "Admin") throw { name: "Forbidden" };

    // kalo dia admin bakal di next
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const authorizationStaff = async (req, res, next) => {
  try {
    // console.log(req.user, "<><><><>>>>>>>");
    if (req.user.role === "Admin") {
      next();
    }else {
      const { id } = req.params;
      let data = await Lodging.findByPk(id)
      console.log(data, ">>>>>");
      if (!data) throw {name: "NotFound"}
      if (req.user.id === data.authorId) {
        next();
      } else {
        throw { name: "Forbidden" };
      }
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { authorizationAdmin, authorizationStaff };
