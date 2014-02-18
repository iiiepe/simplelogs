var app = require("../../app");
var controller = require("./controllers");

app.get("/", controller.dashboard);
app.get("/dashboard", controller.dashboard);