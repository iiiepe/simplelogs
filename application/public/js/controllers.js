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

	$scope.deleteSource = function(selectedId) {
		Sources.remove({id: selectedId},function(data) {
			var selected = {_id: selectedId};
			var sourcesWithoutTheRemovedElement = $scope.sources.filter(function(selected) {
				return selected._id !== selectedId;
			});
	
			$scope.sources = sourcesWithoutTheRemovedElement;
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

function classType(item) {
		if(item == "error") {
			return "label-danger";
		}
		else if(item == "Error") {
			return "label-danger";
		}
		else if(item == "notice") {
			return "label-info";
		}
		else if(item == "Notice") {
			return "label-info";	
		}
		else if(item == "warning") {
			return "label-warning";
		}
		else if(item == "Warning") {
			return "label-warning";
		}
		else if(item == "success") {
			return "label-success";
		}
		else if(item == "Success") {
			return "label-success";
		}
		else {
			return "label-default";
		}
}

// controller to list logs
app.controller("ListLogs", function($scope, Logs, socket, filterService, $log) {
	var limit = 100;
	$scope.filterService = filterService;

	Logs.index({limit: limit}, function(data) {
		$scope.logs = data;
	});

	$scope.socketStatus = true;

	// When the event is emmited, add the data to the array $scope.logs at the beginning
	socket.on("logs:new", function(data) {
		if($scope.socketStatus) {
			$scope.logs.unshift(data);
			$scope.logs.pop();
		}
	});

	$scope.classType = function(item) {
		return classType(item);
	};

	// Toggles the status of the socketStatus
  $scope.toggleActivation = function() {
    $scope.socketStatus = !$scope.socketStatus;
  }

  // depending on the status of socketStatus adds the right classes to the buttons
  $scope.toggleSocketButtonClass = function() {
  	return $scope.socketStatus ? "btn-success glyphicon glyphicon-volume-up" : "btn-danger glyphicon glyphicon-volume-off";
  }
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

	$scope.classType = function(item) {
		return classType(item);
	}
});