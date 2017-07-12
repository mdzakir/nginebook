angular.module("contract.controllers", [
        "contract.module"
    ])
    .controller('ContractController', function($state, $scope,viewAddOns) {
    	$scope.addOnsList = viewAddOns;
    	$scope.editAddOns = function(id){
            $state.go("base.create-contract", {"id" : id});
        };

    });
