angular.module("pricing.controllers", [
        "pricing.module"
    ])
    .controller('PricingController', ['$scope', '$http', '$state', 'Pricing', 'apiEndPoint', 'viewPricing', 'viewRooms', 'viewRateplans', 'hotelId', 'roomId', 
        function($scope, $http, $state, Pricing, apiEndPoint, viewPricing, viewRooms, viewRateplans, hotelId, roomId, ratePlanId) {
        $scope.title = "Pricing";
        $scope.$emit("pageTitleChanged", "Pricing");

        $scope.priceUpdate = {
            start_date : '',
            end_date : '',
            roomType : '',
            ratePlan : '',
            single : '',
            double : '',
            triple : '',
            extra_adult : '',
            extra_child : '',
            extra_bed : ''
        }

        // Rooms
        $scope.rooms = _.clone(viewRooms);
        $scope.priceUpdate.room = $scope.rooms[0].id;

        // Rateplans
        $scope.rateplans = _.clone(viewRateplans);
        $scope.priceUpdate.rateplan = $scope.rateplans[0].id;

        // Room Occupancy Selected
        $scope.roomOccupancySelected = "1";

        $scope.pricingData = viewPricing;

        // Calendar Start Date
        $scope.calDateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            //minDate: new Date(),
            startingDay: 1,
            "setDate": new Date(),
            defaultDate : new Date()
        }

        $scope.cal_start_date = new Date(localStorage.startDate) || new Date();

        $scope.open_cal_start = function() {
            $scope.open_cal_start_popup.opened = true;
        };

        $scope.open_cal_start_popup = {
            opened: false
        };

        $scope.viewPricing = function(start_date, end_date){
            _generatePricingTable(viewPricing);
        };

        function _dateRange(){
            var start = moment();
            if(localStorage.startDate){
                start = localStorage.startDate;
            }
            var end = moment(start).add(14, 'days');
            localStorage.startDate = start;
            localStorage.endDate = end;
            return localStorage;
        }

        function _generatePricingTable(pricing){
            var output = {};
            output.roomsList = {};
            output.roomsList.pricingListData = [];
            var roomDetails = [];
            for(var i=0;i<pricing.length;i++){
                var startDate = localStorage.startDate;
                var endDate = localStorage.endDate;
                var datesList = [];
                var invList = [];
                roomDetails.push({
                    "room_id" : pricing[i].room_id,
                    "room_name" : pricing[i].room_name
                });

                for(var date = moment(startDate); (date.isBefore(endDate) || date.isSame(endDate)); date.add(1, 'days')) {
                    var dateValue = moment(date).format("YYYY-MM-DD");

                    datesList.push({
                        "year" : moment(date).format("YYYY"),
                        "month" : moment(date).format("MMM"),
                        "date" : moment(date).format("DD"),
                        "day" : moment(date).format("ddd")
                    });
                    
                    if(pricing[i].price_list[dateValue]){
                        invList.push({
                            "price": pricing[i].price_list[dateValue].price,
                            "single" : pricing[i].price_list[dateValue].price[1],
                            "double" : pricing[i].price_list[dateValue].price[2],
                            "triple" : pricing[i].price_list[dateValue].price[3],
                            "extra_adult" : pricing[i].price_list[dateValue].price[4],
                            "extra_child" : pricing[i].price_list[dateValue].price[5],
                            "extra_bed" : pricing[i].price_list[dateValue].price[6],
                            "date" : dateValue,
                            "room_id" : pricing[i].room_id,
                            "room_name" : pricing[i].room_name
                        })
                    } else {
                        invList.push({
                            "price": ["NA", "NA", "NA", "NA", "NA", "NA", "NA"],
                            "single" : "NA",
                            "double" : "NA",
                            "triple" : "NA",
                            "extra_adult" : "NA",
                            "extra_child" : "NA",
                            "extra_bed" : "NA",
                            "date" : dateValue,
                            "room_id" : pricing[i].room_id,
                            "room_name" : pricing[i].room_name
                        })
                    }
                }
                output.dates = datesList;
                output.roomsList.pricingListData.push(invList);

            }
            output.roomsList.roomData = roomDetails;
            return output;
        }

        $scope.pricingTable = _generatePricingTable(viewPricing);

        $scope.setNewDates = function(new_start_date){
            var start = moment(new_start_date, "YYYY-MM-DD");
            var end = moment(new_start_date, "YYYY-MM-DD").add(14, 'days');
            localStorage.startDate = start;
            localStorage.endDate = end;
            $scope.viewPricing(start.format("YYYY-MM-DD"),end.format("YYYY-MM-DD"));
        }

        $scope.startDateChanged = function(){

            var start = moment($scope.cal_start_date, "YYYY-MM-DD");
            var end = moment($scope.cal_start_date, "YYYY-MM-DD").add(14, 'days');
            localStorage.startDate = start;
            localStorage.endDate = end;

            Pricing.getPricing(hotelId, roomId, ratePlanId, localStorage).then(function(response){
                $scope.pricingTable = _generatePricingTable(response);
            });
        };

        $scope.previousDates = function(){
            var start = moment(localStorage.startDate).add(-14, 'days');
            var end = localStorage.startDate;
            localStorage.startDate = start;
            localStorage.endDate = end;

            $scope.cal_start_date = new Date(localStorage.startDate);

            Pricing.getPricing(hotelId, roomId, ratePlanId, localStorage).then(function(response){
                $scope.pricingTable = _generatePricingTable(response);
            });
        };

        $scope.nextDates = function(){
            var start = moment(localStorage.endDate);
            var end = moment(start).add(14, 'days');
            localStorage.startDate = start;
            localStorage.endDate = end;

            $scope.cal_start_date = new Date(localStorage.startDate);

            Pricing.getPricing(hotelId, roomId, ratePlanId, localStorage).then(function(response){
                $scope.pricingTable = _generatePricingTable(response);
            });
        };

        // Rooms
        $scope.rooms = _.clone(viewRooms);
        $scope.room = $scope.rooms[0].id;

        // Date options for form
        $scope.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd MMM yyyy', 'shortDate'];
        $scope.format = $scope.formats[2];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.datesSet = []

        //Filters Form

        $scope.filter_rooms = _.clone(viewRooms);
        $scope.filter_room = $scope.filter_rooms[0].id;

        $scope.open_filter_start = function() {
            $scope.filter_start_date_popup.opened = true;
        };

        $scope.open_filter_end = function() {
            $scope.filter_end_date_popup.opened = true;
        };

        $scope.filter_start_date_popup = {
            opened: false
        };

        $scope.filter_end_date_popup = {
            opened: false
        };

        //Update Form

        $scope.open_start = function() {
            $scope.start_date_popup.opened = true;
        };

        $scope.open_end = function() {
            $scope.end_date_popup.opened = true;
        };

        $scope.start_date_popup = {
            opened: false
        };

        $scope.end_date_popup = {
            opened: false
        };

        // WEEK ARRAY

        $scope.weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

        $scope.showUpdatePricingForm = false;
        $scope.showUpdatePricingFormFn = function(){
            $scope.showUpdatePricingForm = true;
        };

        $scope.hideUpdatePricingFormFn = function(){
            $scope.showUpdatePricingForm = false; 
        }

        $scope.roomChange = function(room) {
            $scope.priceUpdate.room = room;
        }

        $scope.filterRoomChange = function(filter_room){
            $scope.filter_room = filter_room;
        }

        $scope.updateFormElements = {
            start_date : '',
            end_date : '',
            availability : '',
        }

        // Room occupancy tabs

        $scope.roomOccupancy = function(occId){
            $scope.roomOccupancySelected = occId;
        }

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

            Pricing.updatePricing(params, function() {
                $state.go('.', {}, { reload: 'base.pricing' });
            });
        };

 

    }]);
