var express = require("express");
var app = require("../../app");

var controller = require("./controllers");

app.get('/api/logs', controller.index);
app.get('/api/logs/:id', controller.getLog);
app.post('/api/logs', controller.postLog);