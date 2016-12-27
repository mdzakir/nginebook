angular.module("inventory.controllers", [
        "inventory.module"
    ])
    .controller('InventoryController', ['$scope', function($scope) {
        $scope.title = "Inventory Page";
        $scope.description = "This is a Product App Development Company";
        $scope.team = ["Zakir", "Muhammad", "Bharathi", "Vijay"];

        $scope.$emit("pageTitleChanged", "Inventory");

        $scope.randomNumber = 111;

        var intveral = function(){

	        $scope.$watch("randomNumber", function(oldVal, newVal){
	        	console.log("Old Value : ", oldVal, "NEW VALUE : ", newVal);
	        });

	        setInterval(function(){
	        	$scope.$apply(function(){
		        	$scope.randomNumber = Math.random() * 100;
		        	console.log("Number: ", $scope.randomNumber);
	        	});
	        }, 2000);

	    }

	        $scope.$on("$destroy", function(){
	        	console.log("About Destroy Called");
	        	clearInterval(intveral);
	        });
        

    }])