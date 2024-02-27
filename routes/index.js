const express = require("express");
const Controller = require("../controllers/controller");
const route = express.Router();

route.post("/lodgings", Controller.createLodging)
route.get("/lodgings", Controller.getLodging)
route.get("/lodgings/:id", Controller.getLodgingByID)
route.put("/lodgings/:id", Controller.updateLodging)
route.delete("/lodgings/:id", Controller.deleteLodging)

route.post("/types", Controller.createType)
route.get("/types", Controller.getType)

module.exports = route