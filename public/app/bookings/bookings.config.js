angular.module("bookings.config", [])
.config(function ($stateProvider) {
	$stateProvider
	.state("bookings", {
		url : "/bookings",
		controller : "BookingsController",
		templateUrl : "app/bookings/templates/bookings.html"
	})
});