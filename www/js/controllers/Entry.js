angular.module('starter.controllers')
.controller('EntryCtrl', ['$scope', '$state', '$stateParams', 'entryService',
	function ($scope, $state, $stateParams, entryService) {
	    if (entryService.getSelected()) {
	        $scope.toQuote = entryService.getSelected();
	        console.log($scope.toQuote);
	        entryService.selectEntry();
	    }

	    $scope.cancel = function () {
	        $state.go('forum.thread.dash');
	    };

	    $scope.addEntry = function (entry) {
	        var newEntry = {
	            content: entry,
	            toQuote: $scope.toQuote
	        };
	        entryService.add($stateParams.threadId, newEntry, function () {
	            $state.go('forum.thread.dash');
	        });
	    };
	}]);