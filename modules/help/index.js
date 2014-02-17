var express = require("express");
var app = require("../../app");
var path = require("path");

var controller = require("./controllers");

/** 
 * Not ideal 
 */
var views = app.settings.views;
var currentView = path.join(__dirname, 'views');
views.push(currentView);
app.set('views', views);

app.get("/help/api", controller.api);