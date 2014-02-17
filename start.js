
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var config = require("./config/config.json");

/** To be deleted */
// var routes = require('./routes');
// var sourcesPages = require("./routes/sourcesPages");
// var dashboard = require("./routes/dashboard");
/** Till here */

var app = require("./app");
var server = http.createServer(app);
var io = require("./lib/socket")(server);

mongoose.connect(config.mongodburi);

/** 
 * @todo dynamic lookup of modules 
 */
var usersAPI = require("./modules/users-api");
var logsAPI = require('./modules/logs-api');
var sourcesAPI = require("./modules/sources-api");
var sources = require("./modules/sources");
var help = require("./modules/help");

app.use(usersAPI);
app.use(sourcesAPI);
app.use(logsAPI);
app.use(help);
app.use(sources);

/**
 * Routes
 */
// app.get('/', routes.index);

// app.get("/dashboard", dashboard.index);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
