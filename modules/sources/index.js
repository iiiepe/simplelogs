var app = require("../../app");

var controller = require("./controllers");

app.get("/sources", controller.getSources);