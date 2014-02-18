var app = require("../../app");

var controller = require("./controllers");

app.get('/api/sources', controller.index);
app.get('/api/sources/:name', controller.getSource);
app.post('/api/sources', controller.postSource);
app.delete('/api/sources/:id', controller.deleteSource);