app.controller("ListLogs", function($scope, Logs, socket) {
	Logs.index(function(data) {
		$scope.logs = data;
	});

	// When the event is emmited, add the data to the array $scope.logs at the beginning
	socket.on("logs:new", function(data) {
		$scope.logs.unshift(data);
	})
});

app.controller("ListSources", function($scope) {

});

app.controller("MenuController", function($scope, $location) {
	$scope.menuClass = function(page) {
    var current = $location.path().substring(1);
    return page === current ? "active" : "";
  };
});

/**
 * Controls the Log Modal
 */
app.controller("ModalLogController", function($scope, $modal, $log, Logs) {
	$scope.openModal = function(selectedId) {
		Logs.get({id: selectedId}, function(data) {
			$scope.item = data; 

			var modal = $modal.open({
				templateUrl: "modalLog",
				controller: "ModalInstanceController",
				size: "lg",
				resolve: {
					item: function() {
						return $scope.item;
					}
				}
			});

			modal.result.then(function (selectedItem) {
				$scope.selected = selectedItem;
			}, function() {
				
			})
		});
	}
});

app.controller("ModalInstanceController", function($scope, $modalInstance, item) {
	$scope.item = item;

	$scope.ok = function() {
		$modalInstance.close($scope.item);
	}

	$scope.cancel = function() {
		$modalInstance.dismiss("cancel");
	}
});