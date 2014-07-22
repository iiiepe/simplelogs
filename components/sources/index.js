var include = require("includemvc");
var app = include.app();
var controller = include.controller("sources");

app.get("/sources", controller.getSources);