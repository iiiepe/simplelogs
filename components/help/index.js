var include = require("includemvc");
var app = include.app();
var controller = include.controller("help");

app.get("/help/api", controller.api);