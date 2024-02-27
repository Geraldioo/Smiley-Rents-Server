const express = require("express");
const { errHandler } = require("../middleware/errHandler");
const ControllerAdmin = require("../controllers/admin-controller");
const ControllerUser = require("../controllers/user-controller");
const ControllerAuth = require("../controllers/auth-controller");
const route = express.Router();

// admin session
route.post("/lodgings", ControllerAdmin.createLodging)

// user session
route.get("/lodgings/pub", ControllerUser.getLodging)

route.get("/lodgings", ControllerAdmin.getLodging) 

// add user
route.post("/add-user", ControllerAuth.addUser)

route.get("/lodgings/:id", ControllerAdmin.getLodgingByID)
route.put("/lodgings/:id", ControllerAdmin.updateLodging)
route.delete("/lodgings/:id", ControllerAdmin.deleteLodging)
// user session
route.get("/lodgings/pub/:id", ControllerUser.getLoadingByID)

route.post("/types", ControllerAdmin.createType)
route.get("/types", ControllerAdmin.getType)
route.put("/types/:id", ControllerAdmin.updateType)
route.delete("/types/:id", ControllerAdmin.deleteType)

// user session

route.use(errHandler)

module.exports = route