angular.module("pricing.controllers", [
        "pricing.module"
    ])
    .controller('PricingController', ['$scope', '$http', '$state', 'Pricing', 'apiEndPoint', 'viewPricing', 'viewRooms', 'viewRateplans', 'hotelId', 'roomId', 
        function($scope, $http, $state, Pricing, apiEndPoint, viewPricing, viewRooms, viewRateplans, hotelId, roomId) {
        $scope.title = "Pricing";
        $scope.$emit("pageTitleChanged", "Pricing");

        // Rooms
        $scope.rooms = _.clone(viewRooms);
        $scope.room = $scope.rooms[0].id;

        // Rateplans
        $scope.rateplans = _.clone(viewRateplans);
        $scope.rateplan = $scope.rateplans[0].id;


        // DATE PICKER

        $scope.pricingData = viewPricing;

        console.log($scope.pricingData);

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

        // GENERATE Pricing TABLE

        function generatePricingTable() {
            var year = Pricing.currentYear();
            var month = Pricing.currentMonth() - 1;

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

            _.times(monthDate.daysInMonth(), function(n) {
                $scope.daysInMonth.push({
                    date: monthDate.format('DD'),
                    fullDate: monthDate.format('YYYY-MM-DD'),
                    value: 2000
                });
                monthDate.add(1, 'day');
            });

            $scope.allDaysOfMonthWeekWise = setOffset(weeksetOffset.concat($scope.daysInMonth));
            $scope.allDaysOfMonth = _.flatten($scope.allDaysOfMonthWeekWise)

        }

        generatePricingTable();

        $scope.updatePricing = function() {
            var params = {
                "hotel_id": "58726a8e5aa124394eb7dae4",
                "room_id": $scope.room,
                "rate_id": $scope.rateplan,
                "price_details": {
                    "1": $scope.single,
                    "2": $scope.double,
                    "3": $scope.triple,
                    "4": $scope.extra_adult,
                    "5": $scope.extra_child,
                    "6": $scope.extra_bed
                },
                "start_date": moment($scope.start_date).format("YYYY-MM-DD"),
                "end_date": moment($scope.end_date).format("YYYY-MM-DD")
            };

            // var post_url = apiEndPoint + '/ratePlan/price/'
            // $http.post(post_url, angular.toJson(params, true))
            //     .then(function() {
            //         $state.go('.', {}, { reload: 'pricing' });
            //     });

            Pricing.updatePricing(params, function() {
                $state.go('.', {}, { reload: 'base.pricing' });
            });
        };


    }]);
