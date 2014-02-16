var app = require("../app");
var io = require("socket.io");

module.exports = function(server) {
  var sio = io.listen(server, {log: true});

  sio.sockets.on("connection", function(socket) {
    app.on("logs:new", function(data) {
        socket.emit("logs:new", data);
    })
  })
}