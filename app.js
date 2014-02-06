
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var logs = require('./routes/logs');
var user = require('./routes/user');
var sources = require('./routes/sources');
var search = require("./routes/search");
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/simplelogs');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
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

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/api/logs', logs.index);
app.get('/api/logs/:id', logs.getLog);
app.post('/api/logs', logs.postLog);

app.get('/api/sources', sources.index);
app.get('/api/sources/:name', sources.getSource);
app.post('/api/sources', sources.postSource);
app.delete('/api/sources/:id', sources.deleteSource);

app.get("/search", search.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
