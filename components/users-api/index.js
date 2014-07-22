var include = require("includemvc");
var app = include.app();
var controller = include.controller("users-api");

app.get("/api/users/:id", controller.getUser);
app.get("/api/users", controller.getUsers);
app.post("/api/users", controller.postUser);