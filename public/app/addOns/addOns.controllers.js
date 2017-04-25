angular.module("addOns.controllers", [
        "addOns.module"
    ])
    .controller('AddOnsController', function($state, $scope,viewAddOns) {
    	$scope.addOnsList = viewAddOns;

    });
