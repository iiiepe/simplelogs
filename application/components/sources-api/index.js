var include = require("includemvc");
var app = include.app();
var controller = include.controller("sources-api");

app.get('/api/sources', controller.index);
app.get('/api/sources/:id', controller.getSource);
app.post('/api/sources', controller.postSource);
app.delete('/api/sources/:id', controller.deleteSource);