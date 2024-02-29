const express = require("express");
const { errHandler } = require("../middleware/errHandler");
const ControllerUser = require("../controllers/admin-controller");
const ControllerPublic = require("../controllers/public-controller");
const ControllerAuth = require("../controllers/auth-controller");
const { authentication } = require("../middleware/authentication");
const { authorizationAdmin, authorizationStaff } = require("../middleware/authorization");
const Uploader = require("../middleware/uploader");
const route = express.Router();


// Public session
route.get("/pub/lodgings", ControllerPublic.getLodging)
route.get("/pub/lodgings/types", ControllerPublic.getLoadingType)
route.get("/pub/lodgings/:id", ControllerPublic.getLoadingByID)

// User Login
route.post("/login", ControllerAuth.login)

// middleware
route.use(authentication)

// User Register
route.post("/add-user", authorizationAdmin, ControllerAuth.addUser)

// User session
route.post("/lodgings", ControllerUser.createLodging)
route.get("/lodgings", ControllerUser.getLodging) 
route.get("/lodgings/:id", ControllerUser.getLodgingByID)
route.put("/lodgings/:id", authorizationStaff, ControllerUser.updateLodging)
route.delete("/lodgings/:id", authorizationStaff, ControllerUser.deleteLodging)

route.post("/types", ControllerUser.createType)
route.get("/types", ControllerUser.getType)
route.put("/types/:id", authorizationStaff, ControllerUser.updateType)  
route.delete("/types/:id", authorizationStaff, ControllerUser.deleteType)

// multer
route.patch("/lodgings/:id", authorizationStaff, Uploader.single("image"), ControllerUser.updateImg)

route.use(errHandler)

module.exports = route