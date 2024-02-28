const express = require("express");
const { errHandler } = require("../middleware/errHandler");
const ControllerUser = require("../controllers/admin-controller");
const ControllerPublic = require("../controllers/public-controller");
const ControllerAuth = require("../controllers/auth-controller");
const { authentication } = require("../middleware/authentication");
const { authorizationAdmin, authorizationStaff } = require("../middleware/authorization");
const route = express.Router();


// public session
route.get("/pub/lodgings/:id", ControllerPublic.getLoadingByID)
route.get("/pub/lodgings", ControllerPublic.getLodging)
// add user
route.post("/add-user", ControllerAuth.addUser)
route.post("/login", ControllerAuth.login)

// middleware
route.use(authentication)

// user session
route.post("/lodgings", ControllerUser.createLodging)
route.get("/lodgings", ControllerUser.getLodging) 

route.get("/lodgings/:id", ControllerUser.getLodgingByID)
route.put("/lodgings/:id", ControllerUser.updateLodging)
route.delete("/lodgings/:id", ControllerUser.deleteLodging)

route.post("/types", ControllerUser.createType)
route.get("/types", ControllerUser.getType)
route.put("/types/:id", ControllerUser.updateType)
route.delete("/types/:id", ControllerUser.deleteType)


route.use(errHandler)

module.exports = route