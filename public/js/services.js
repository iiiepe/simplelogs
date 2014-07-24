/**
 * Handle the logs connection
 */
app.factory("Logs", function($resource) {
	var Logs = $resource(app.baseUrl + "/api/logs/:id", {
		
	}, {
		index: {method: "GET", isArray: true},
		get: {method: "GET", isArray: false}
	});

	return Logs;
});

/**
 * Handle the socket.io connection
 */
app.factory("socket", function($rootScope) {
	var socket = io.connect();
	return {
		on: function(eventName, callback) {
			socket.on(eventName, function() {
				var args = arguments;
				
				$rootScope.$apply(function() {
					callback.apply(socket, args);
				});
			});
		}
	}
});	