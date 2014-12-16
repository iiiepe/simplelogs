var include = require("includemvc");
var app = include.app();
var io = require("socket.io");

module.exports = function(server) {
  var sio = io.listen(server, {log: true});

  sio.sockets.on("connection", function(socket) {
    console.log("Connected");
    app.on("logs:new", function(data) {
        socket.emit("logs:new", data);
    })
    
    app.on("users:get", function(data) {
      console.log("Got users:get");
      console.log(data);
    });
  })
}