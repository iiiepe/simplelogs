var express = require("express");
var path = require("path");
var app = require("../../app");

/** 
 * Not ideal 
 */
var views = app.settings.views;
var currentView = path.join(__dirname, 'views');
views.push(currentView);
app.set('views', views);

var controller = require("./controllers");


app.get("/sources", controller.getSources);