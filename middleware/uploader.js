const multer = require("multer");

const Uploader = multer({
    storage : multer.memoryStorage()
})

module.exports = Uploader