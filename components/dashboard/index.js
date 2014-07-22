var include = require("includemvc");
var app = include.app();
var controller = include.controller("dashboard");

app.get("/", controller.dashboard);
app.get("/dashboard", controller.dashboard);