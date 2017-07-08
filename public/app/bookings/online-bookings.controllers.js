angular.module("online-bookings.controllers", [
	"online-bookings.module"
])

.controller('OnlineBookingsController', function ($scope, $http,viewBooking) {
	$scope.title = "Online Bookings";
	$scope.$emit("pageTitleChanged", "Online Bookings");

	// DATE PICKER

	$scope.dateOptions = {
		formatYear: 'yy',
		maxDate: new Date(2020, 5, 22),
		minDate: new Date(),
		startingDay: 1
	};

	$scope.open_start = function() {
		$scope.start_date_popup.opened = true;
	};

	$scope.open_end = function() {
		$scope.end_date_popup.opened = true;
	};

	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd MMM yyyy', 'shortDate'];
	$scope.format = $scope.formats[2];
	$scope.altInputFormats = ['M!/d!/yyyy'];

	$scope.start_date_popup = {
		opened: false
	};

	$scope.end_date_popup = {
		opened: false
	};
	
	// BOOKING DATA
	$scope.bookingData = viewBooking;
});
















