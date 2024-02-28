const express = require("express");
const { errHandler } = require("../middleware/errHandler");
const ControllerAdmin = require("../controllers/admin-controller");
const ControllerUser = require("../controllers/user-controller");
const ControllerAuth = require("../controllers/auth-controller");
const { authentication } = require("../middleware/authentication");
const route = express.Router();


// add user
route.post("/add-user", ControllerAuth.addUser)
route.post("/login", ControllerAuth.login)

route.use(authentication)


// admin session
route.post("/lodgings", ControllerAdmin.createLodging)
route.get("/lodgings", ControllerAdmin.getLodging) 

route.get("/lodgings/:id", ControllerAdmin.getLodgingByID)
route.put("/lodgings/:id", ControllerAdmin.updateLodging)
route.delete("/lodgings/:id", ControllerAdmin.deleteLodging)

route.post("/types", ControllerAdmin.createType)
route.get("/types", ControllerAdmin.getType)
route.put("/types/:id", ControllerAdmin.updateType)
route.delete("/types/:id", ControllerAdmin.deleteType)

// user session
route.get("/lodgings/pub/:id", ControllerUser.getLoadingByID)
route.get("/lodgings/pub", ControllerUser.getLodging)

route.use(errHandler)

module.exports = route