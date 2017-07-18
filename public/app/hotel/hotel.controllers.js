angular.module("hotel.controllers", [
        "hotel.module"
    ])
    .controller('HotelBasicDetailController', function($state, $scope,viewBasicDetails) {
        $scope.title = "Hotel Basic Detail";
        $scope.$emit("pageTitleChanged", "Hotel Basic Detail");
    	$scope.basicDetails = viewBasicDetails;
    });
   
