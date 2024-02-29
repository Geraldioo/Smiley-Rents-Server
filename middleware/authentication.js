const { verifyToken } = require("../helper/jwt")
const {User} = require("../models")

const authentication = async (req, res, next) => {
    try {

        // kita cek user bawa token atau tidak
        const {authorization} = req.headers
        if (!authorization) throw {name: "InvalidToken"}
        // console.log(authorization, "<<<><>>><><><><");

        // console.log(req.headers, "<><><><>");
        // kita cek type tokennya bearer atau bukan
        const [type, token] = authorization.split(" ")
        if (type !== "Bearer") throw {name: "InvalidToken"}

        // kita cek tokennya asli atau tidak
        const {id} = verifyToken(token)

        // kita cek ke db, apakah isi token itu sesuai dengan db kita?
        const user = await User.findByPk(id)
        if (!user) throw {name: "InvalidToken"}

        req.user = user
        // - lanjutakan ke endpoint
        next()
        // selesai
    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports = {authentication}