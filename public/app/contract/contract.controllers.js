angular.module("contract.controllers", [
        "contract.module"
    ])
    .controller('ContractController', function($state, $scope,viewContract) {
        $scope.title = "Contract";
        $scope.$emit("pageTitleChanged", "Create Contract");
    	$scope.contractList = viewContract;
    	$scope.editContract = function(id){
            $state.go("base.create-contract", {"id" : id});
        };

    });
