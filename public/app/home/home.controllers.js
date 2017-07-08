angular.module("home.controllers", [
	"home.module"
])

.controller('HomeController', function ($scope, $http) {
	
	$scope.title = "Dashboard";
	$scope.$emit("pageTitleChanged", "Dashboard");

	  $scope.labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
	  $scope.series = ['Travel Agent', 'Website', 'Walk-ins'];
	  $scope.data = [
	    [65, 59, 80, 81, 56, 55, 40],
	    [30, 49, 22, 26, 60, 37, 12],
	    [48, 20, 39, 13, 32, 44, 17]
	  ];
	  $scope.onClick = function (points, evt) {
	    console.log(points, evt);
	  };
	  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
	  $scope.options = {
	    scales: {
	      yAxes: [
	        {
	          id: 'y-axis-1',
	          type: 'linear',
	          display: true,
	          position: 'left'
	        }
	      ]
	    }
	  };


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