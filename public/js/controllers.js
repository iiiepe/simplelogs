// Controls the menu
app.controller("MenuController", function($scope, $location) {
	$scope.menuClass = function(page) {
    var current = $location.path().substring(1);
    return page === current ? "active" : "";
  };
});

// controller to lists sources
app.controller("ListSources", function($scope, $modal, $log, Sources) {
	/// call the index method and update the $scope.sources with the new data
	Sources.index(function(data) {
		$scope.sources = data;
	});

	// respond to the addSource event
	$scope.addSource = function() {
		var modal = $modal.open({
			templateUrl: "modalAddSource",
			controller: "ModalSourceControllerInstance",
			size: "sm",
			scope: $scope // Pass the current scope
		});
	}
});

// handle the modal instance created on ListSources
app.controller("ModalSourceControllerInstance", function($scope, $modalInstance, Sources) {
	// take the model source
	$scope.source = {};

	// On save create the new data, wait for the new model and then update
	// the $scope.sources by adding the new data to the end of the array
	$scope.ok = function() {
		Sources.create($scope.source, function(data) {
			$scope.sources.push(data);
			$modalInstance.close();
		});

	}

	$scope.cancel = function() {
		$modalInstance.dismiss("cancel");
	}
});

// controller to list logs
app.controller("ListLogs", function($scope, Logs, socket, filterService) {
	$scope.filterService = filterService;

	Logs.index(function(data) {
		$scope.logs = data;
	});

	// When the event is emmited, add the data to the array $scope.logs at the beginning
	socket.on("logs:new", function(data) {
		$scope.logs.unshift(data);
	})
});

app.controller("FilterController", function($scope, filterService) {
	$scope.filterService = filterService;

	$scope.clearSearchText = function() {
		$scope.filterService.searchText = "";
	}
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
				controller: "ModalLogInstanceController",
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

app.controller("ModalLogInstanceController", function($scope, $modalInstance, item) {
	$scope.item = item;

	$scope.ok = function() {
		$modalInstance.close($scope.item);
	}

	$scope.cancel = function() {
		$modalInstance.dismiss("cancel");
	}
});

