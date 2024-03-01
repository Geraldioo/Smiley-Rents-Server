const express = require("express");
const route = require("./routes");
const app = express();

if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(route);

module.exports = app