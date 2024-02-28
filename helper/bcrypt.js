const bcrypt = require("bcryptjs")

const hasPass = (plainpass) => {
 return bcrypt.hashSync(plainpass, bcrypt.genSaltSync(10))
}

const comparePassword = (plainpass, hashedPass) => {
    return bcrypt.compareSync(plainpass, hashedPass)
}

module.exports = {hasPass, comparePassword}