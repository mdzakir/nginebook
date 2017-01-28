angular.module("promotions.controllers", [
        "promotions.module"
    ])
	.factory('DealsPromtions', function ($http) {
        return {
            save: function (hotelId, data) {
                return $http.post('/hotel/promotions', data);
            }
        };

	})
    .controller('DealsPromotionsController', ['$scope', 'DealsPromtions', function($scope, DealsPromtions) {
        $scope.title = "DealsPromtions";
        $scope.$emit("pageTitleChanged", "DealsPromtions");

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
		
		// WEEK ARRAY

		$scope.weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

		// OFFSET FOR GENERATING DATES
		function setOffset(arr) {
            var newArr = [];
            for (var i = 0; i < arr.length; i += 7) {
                newArr.push(arr.slice(i, i + 7));
            }
            return newArr;
		}

}]);