angular.module("hotel-contact.controllers", [
        "hotel.module"
    ])
    .controller('HotelContactDetailsController', function($state, $scope,viewContactsDetails) {
        $scope.title = "Hotel Contact Detail";
        $scope.$emit("pageTitleChanged", "Hotel Contact Detail");
    	$scope.contactDetails = viewContactsDetails;
    });
   
