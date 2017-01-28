angular.module("deals.controllers", [
        "deals.module"
    ])
	.factory('ManageDeals', function ($http) {
        return {
            save: function (hotelId, data) {
                return $http.post('/hotel/deals', data);
            }
        };

	})
    .controller('DealsPromotionsController', ['$scope', 'ManageDeals', function($scope, ManageDeals) {
        $scope.title = "Manage Deals";
        $scope.$emit("pageTitleChanged", "ManageDeals");

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

        $scope.saveDeal = function(){
            $scope.room.selectedAmenities = _.filter($scope.amenities, 'checked');
            $scope.room.selectedAmenities = _.filter($scope.amenities, 'checked');
            $scope.room.selectedAmenities = _.filter($scope.amenities, 'checked');
            var params = {
			    "hotel_id": "58726a8e5aa124394eb7dae4",
			    "name": "Hot Deal",
			    "description": "20% discount",
			    "type": "BASIC",
			    "status": "ACTIVE",
			    "check_in_period": {
			        "start_date": "27-01-2017",
			        "end_date": "28-02-2017",
			        "days": [1, 1, 1, 1, 1, 1, 1],
			        "blackout_date": ["30-01-2017", "31-01-2017"]
			    },
			    "booking_period": {
			        "start_date": "27-01-2017",
			        "end_date": "28-02-2017",
			        "days": [1, 1, 1, 1, 1, 1, 1],
			        "blackout_date": ["30-01-2017", "31-01-2017"]
			    },
			    "rooms": ["11313", "1121"],
			    "rate_plans": ["313", "21"],
			    "discount_type": "PERCENTAGE",
			    "discount_value": "20"
			};

            ManageDeals.save(params, isAddRoom, function () {
                $state.go('.', {}, { reload: 'rooms' });
            });
        };

        $scope.deleteRoom = function(room){
            params = {status : 0}
            ManageDeals.deleteRoom(params, isAddRoom, function () {
                $state.go('.', {}, { reload: 'rooms' });
            });
        }

        $scope.editRoom = function(room){
            $state.go('.', { 'roomId': room.id }, { reload: 'rooms' });
        };

}]);