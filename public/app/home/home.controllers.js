angular.module("home.controllers", [
	"home.module"
])

.controller('HomeController', function ($scope, $http) {

	$scope.hotels = [
		{
			id : 'vyt',
			name : 'Hotel Vythiri Village'
		},
		{
			id : 'kri',
			name : 'Hotel Krishna'
		}
	];

    $scope.hotelId = 'kri';
    $scope.indexOfSelectedHotel = _.findIndex($scope.hotels, function (o) {
        return o.id == $scope.hotelId;
    });

	$scope.selectedHotel = $scope.hotels[$scope.indexOfSelectedHotel];

	$scope.hotelChanged = function (changedHotelID) {
        $scope.hotelId = changedHotelID;
        $scope.indexOfSelectedHotel = _.findIndex($scope.hotels, function (o) {
            return o.id == $scope.hotelId;
        });
        $scope.selectedHotel = $scope.hotels[$scope.indexOfSelectedHotel];
    };



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