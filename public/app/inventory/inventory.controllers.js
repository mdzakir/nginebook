angular.module("inventory.controllers", [
        "inventory.module"
    ])
	.factory('Inventory', function ($http) {
        return {
            month: moment(),
            currentMonth: function () {
                return parseInt(this.month.format('M'));
            },
            currentYear: function () {
                return parseInt(this.month.format('Y'));
            },
            get: function (hotelId, roomId, ratePlanId) {
                return $http.get('/hotel/optimize/?hotel_id=' + hotelId + '&room_id=' + roomId + '&rate_id=' + ratePlanId + '&date=' + this.currentMonth() + '-' + this.currentYear());
            },
            save: function (hotelId, data) {
                return $http.post('/hotel/override', data);
            }
        };

	})
    .controller('InventoryController', ['$scope', 'Inventory', function($scope, Inventory) {
        $scope.title = "Inventory";
        $scope.$emit("pageTitleChanged", "Inventory");

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
		function chunk(arr) {
            var newArr = [];
            for (var i = 0; i < arr.length; i += 7) {
                newArr.push(arr.slice(i, i + 7));
            }
            return newArr;
		}

		// GENERATE INVENTORY TABLE

		function generateInventoryTable() {
			var year = Inventory.currentYear();
            var month = Inventory.currentMonth() - 1;

            $scope.currentMonth = moment(month).format('MMMM');
            $scope.currentYear = year;

            var startDate = moment([year, month]);
            var endDate = moment(startDate).endOf('month');
            var dates = [];
            var weeksetOffset = [];

            var monthStartDate = new Date(startDate);
            var monthStartWeekday = monthStartDate.getDay();
            var monthOffset = (monthStartWeekday + 6) % 7;

            if (monthOffset - 1 < 6) {
                for (var m = monthOffset - 1; m >= 0; m--) {
                    weeksetOffset.push('&nbsp;');
                }
			}

			$scope.daysInMonth = [];

			var monthDate = moment().startOf('month');

			_.times(monthDate.daysInMonth(), function (n) {
			     $scope.daysInMonth.push({
			     	date : monthDate.format('DD'), 
			     	fullDate : monthDate.format('YYYY-MM-DD'),
			     	value : 12
			     }); 
			     monthDate.add(1, 'day');
			});

			$scope.allDaysOfMonthWeekWise = chunk(weeksetOffset.concat($scope.daysInMonth));
			$scope.allDaysOfMonth = _.flatten($scope.allDaysOfMonthWeekWise)

		}

		generateInventoryTable();

}]);