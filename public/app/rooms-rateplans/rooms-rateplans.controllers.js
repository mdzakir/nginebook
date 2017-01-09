angular.module("rooms-rateplans.controllers", [
        "rooms-rateplans.module"
    ])
    .factory('RoomsRateplans', function($http) {
        return {
            month: moment(),
            currentMonth: function() {
                return parseInt(this.month.format('M'));
            },
            currentYear: function() {
                return parseInt(this.month.format('Y'));
            },
            get: function(hotelId, roomId, ratePlanId) {
                return $http.get('/hotel/optimize/?hotel_id=' + hotelId + '&room_id=' + roomId + '&rate_id=' + ratePlanId + '&date=' + this.currentMonth() + '-' + this.currentYear());
            },
            save: function(hotelId, data) {
                return $http.post('/hotel/override', data);
            }
        };

    })
    .controller('RoomsRateplansController', ['$scope', 'RoomsRateplans', function($scope, RoomsRateplans) {
        $scope.title = "RoomsRateplans";
        $scope.$emit("pageTitleChanged", "RoomsRateplans");

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

        // AVAILABLE ROOMS

        $scope.rooms = [{
            name: 'Standard Affordable OYO Rooms Premium',
            src: 'room_1.jpg',
            desc: 'Rooms Hotel Tbilisi Garden View Twin Room R 2. Theater and the brick, the fireplace, the lighter.'
        }, {
            name: 'Deluxe AC Room',
            src: 'room_2.jpg',
            desc: 'Contemporary Boutique Hotel Suite Main Room Interior Design of Atlantic Resort and Spa Ft. Lauderdale.'
        }, {
            name: 'Luxury Room',
            src: 'room_3.jpg',
            desc: 'Alma House Bed and Breakfast: Room 4 with adjoining room. Nice Room For Rent in Phu Nhuan District.'
        }]




    }]);
