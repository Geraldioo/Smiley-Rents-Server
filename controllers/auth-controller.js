const { User } = require("../models")

class ControllerAuth {
    static async addUser (req, res, next){
        try {
            const user = await User.create(req.body)

            res.status(201).json({message: "User created", user})
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = ControllerAuth