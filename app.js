/**
 * @file exposes the app object instantiated so other modules can
 * require it and share events across the entire application
 */

var express = require("express");
var app = module.exports = exports = express();
var path = require("path");

// all environments
app.set('port', process.env.PORT || 3000);
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var Patch = require('./lib/viewMultipe');
Patch.ViewEnableMultiFolders(app);
app.set('views', [path.join(__dirname, 'views')]);