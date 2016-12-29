angular.module("home.controllers", [
	"home.module"
])

.controller('HomeController', function ($scope, $http) {
	$scope.title = "Dashboard";
	$scope.$emit("pageTitleChanged", "Dashboard");

	$scope.stats = {
		'noOfTodaysBookings':18,
		'noOfTodaysArrivals':10,
		'noOfTodaysStay':14
	}

	$scope.todaysBookings = [
			{
				'name':'Bharath Kumar',
				'checkin':'12 Jul',
				'checkout':'15 Jul'
			},
			{
				'name':'Bharath Kumar Singh Chauhan',
				'checkin':'12 Jul',
				'checkout':'15 Jul'
			},
			{
				'name':'Bharath Kumar',
				'checkin':'12 Jul',
				'checkout':'15 Jul'
			},
			{
				'name':'Bharath Kumar Singh Chauhan',
				'checkin':'12 Jul',
				'checkout':'15 Jul'
			},
			{
				'name':'Bharath Kumar',
				'checkin':'12 Jul',
				'checkout':'15 Jul'
			}
		];

	$scope.todaysArrivals = [
			{
				'name':'Bharath Kumar',
				'checkin':'12 Jul 2017',
				'checkout':'15 Jul 2017'
			},
			{
				'name':'Bharath Kumar',
				'checkin':'12 Jul 2017',
				'checkout':'15 Jul 2017'
			},
			{
				'name':'Bharath Kumar',
				'checkin':'12 Jul 2017',
				'checkout':'15 Jul 2017'
			},
			{
				'name':'Bharath Kumar',
				'checkin':'12 Jul 2017',
				'checkout':'15 Jul 2017'
			},
			{
				'name':'Bharath Kumar',
				'checkin':'12 Jul 2017',
				'checkout':'15 Jul 2017'
			},
			{
				'name':'Bharath Kumar',
				'checkin':'12 Jul 2017',
				'checkout':'15 Jul 2017'
			}
		];

	$scope.todaysStay = [
			{
				'name':'Bharath Kumar',
				'checkin':'12 Jul 2017',
				'checkout':'15 Jul 2017'
			},
			{
				'name':'Bharath Kumar',
				'checkin':'12 Jul 2017',
				'checkout':'15 Jul 2017'
			},
			{
				'name':'Bharath Kumar',
				'checkin':'12 Jul 2017',
				'checkout':'15 Jul 2017'
			},
			{
				'name':'Bharath Kumar',
				'checkin':'12 Jul 2017',
				'checkout':'15 Jul 2017'
			},
		];

})