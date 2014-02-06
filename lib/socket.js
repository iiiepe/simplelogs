var events = require("../lib/events").events;

function Pub(socket) {
	var self = this;

	self.socket = socket;

	self.emit = function(event, data) {
		self.socket.emit(event, data);
	}

	return this;
}

module.exports = function(io) {
	io.sockets.on("connection", function(socket) {
		var pub = new Pub(socket);

		socket.on("ready", function(data) {
			console.log("Client connected to the server");
		})

		events.on("logs:new", function(data) {
			console.log("emit logs:new");
			pub.emit("logs:new", data);
		})
	})
}