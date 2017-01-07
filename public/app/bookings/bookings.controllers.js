angular.module("bookings.controllers", [
	"bookings.module"
])

.controller('BookingsController', function ($scope, $http) {
	$scope.title = "Bookings";
	$scope.$emit("pageTitleChanged", "Bookings");

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
	$scope.bookingData = [
		{
			bookingId : '000BPS3001',
			guestName : 'Mr. India',
			paymentMode : 'Prepaid',
			status : 'Confirmed',
			remark : 'Airport Pickup and Drop'
		},
		{
			bookingId : '000BPS3002',
			guestName : 'Mr. Karnataka',
			paymentMode : 'Postpaid',
			status : 'Pending',
			remark : 'Airport Pickup and Drop'
		},
		{
			bookingId : '000BPS3003',
			guestName : 'Mr. Mysore',
			paymentMode : 'Pay at hotel',
			status : 'Canceled',
			remark : 'Airport Pickup'
		}
	];
});
















