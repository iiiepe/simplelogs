var app = require("../../app");
var controller = require("./controllers");

app.get("/help/api", controller.api);