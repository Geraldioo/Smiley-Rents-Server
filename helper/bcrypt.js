const bcrypt = require("bcryptjs")
const hasPass = (plainpass) => {
 return bcrypt.hashSync(plainpass, bcrypt.genSaltSync(10))
}

module.exports = hasPass