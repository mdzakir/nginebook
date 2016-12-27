angular.module("about.controllers", [
        "about.module"
    ])
    .controller('AboutController', ['$scope', function($scope) {
        $scope.title = "About Page";
        $scope.description = "This is a Product App Development Company";
        $scope.team = ["Zakir", "Muhammad", "Bharathi", "Vijay"];

        $scope.$emit("pageTitleChanged", "About");

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