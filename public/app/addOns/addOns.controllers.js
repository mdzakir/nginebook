angular.module("addOns.controllers", [
        "addOns.module"
    ])
    .controller('AddOnsController', function($state, $scope,viewAddOns) {
    	$scope.addOnsList = viewAddOns;
    	$scope.editAddOns = function(id){
            $state.go("base.create-addOns", {"id" : id});
        };

    });
