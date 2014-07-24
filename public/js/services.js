/**
 * Handle the logs connection
 */
app.service("Logs", function($resource) {
	var Resource = $resource(app.baseUrl + "/api/logs/:id", {
		
	}, {
		index: {method: "GET", isArray: true},
		get: {method: "GET", isArray: false}
	});

	return Resource;
});

app.service("Sources", function($resource) {
	var Resource = $resource("/api/sources/:id", {}, {
		index: {method: "GET", isArray: true},
		get: {method: "GET", isArray: false},
		create: {method: 'POST'}
	});

	return Resource;
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

app.factory("filterService", function() {
	return {
		activeFilters: {},
		searchText: ''
	}
});