var express = require("express");
var app = require("../../app");

var model = require("./models");
var controller = require("./controllers");



app.get("/api/users/:id", controller.getUser);
app.get("/api/users", controller.getUsers);
app.post("/api/users", controller.postUser);