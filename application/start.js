var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var include = require("includemvc");
var app = include.app();
var config = app.config;

var server = http.createServer(app);
var io = require("./lib/socket")(server);
var fs = require("fs");

if(config.mongodburi) {
	mongoose.connect(config.mongodburi);
}

/** 
 * Load all modules enabled in config.modules
 * The module must have an index.js present 
 */
var components = config.components;
components.forEach(function(component) {
	app.use(require("./components/" + component));
});

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});