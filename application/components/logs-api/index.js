var include = require("includemvc");
var app = include.app();
var controller = include.controller("logs-api");

app.get('/api/logs', controller.index);
app.get('/api/logs/:id', controller.getLog);
app.post('/api/logs', controller.postLog);