angular.module("hotel-map.controllers", [
        "hotel.module"
    ])
    .controller('HotelMapDetailsController', function($state, $scope,viewMapDetails) {
        $scope.title = "Hotel Map";
        $scope.$emit("pageTitleChanged", "Hotel Map");
    	$scope.mapDetails = viewMapDetails;
    });
   
