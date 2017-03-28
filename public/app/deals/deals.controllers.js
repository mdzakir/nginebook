angular.module("deals.controllers", [
        "deals.module"
    ])
    .controller('DealsController', ['$scope', '$state', '$http', 'ManageDeals', function($scope, $state, $http, ManageDeals) {
        $scope.title = "Manage Deals";
        $scope.$emit("pageTitleChanged", "ManageDeals");

/*        // AVAILABLE ROOMS
        $scope.deals = viewDeals;
        var isAddDeal = _.isEmpty($scope.deals);

        //$scope.deal = getDealForEdit || {};

        console.log(isAddDeal);

        if(isAddDeal){

        }else{
            $scope.showAddRoomForm = true;
        }*/

        // Select options
        $scope.dealTypes = [
          {id: 'BASIC', name: 'Basic'},
          {id: 'EARLY BIRD', name: 'Early Bird'}
        ];
        $scope.selectedDealType = $scope.dealTypes[0];

        $scope.dealStatus = [
          {id: 'ACTIVE', name: 'Active'},
          {id: 'INACTIVE', name: 'Inactive'}
        ];
        $scope.selectedDealStatus = $scope.dealStatus[0];

        // DATE PICKER

        $scope.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        $scope.open_booking_start = function() {
            $scope.booking_start_date_popup.opened = true;
        };

        $scope.open_booking_end = function() {
            $scope.booking_end_date_popup.opened = true;
        };

        $scope.open_checkin_start = function() {
            $scope.checkin_start_date_popup.opened = true;
        };

        $scope.open_checkin_end = function() {
            $scope.checkin_end_date_popup.opened = true;
        };


        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd MMM yyyy', 'shortDate'];
        $scope.format = $scope.formats[2];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.booking_start_date_popup = {opened: false};
        $scope.booking_end_date_popup = {opened: false};
        $scope.checkin_start_date_popup = {opened: false};
        $scope.checkin_end_date_popup = {opened: false};

        // Get booking range of dates
        $scope.bookingRangeOfDates = function(){

        	var start_date = moment($scope.booking_start_date).format("YYYY-MM-DD");
        	var end_date = moment($scope.booking_end_date).format("YYYY-MM-DD");

        	var applicableDays = _.map($scope.bookingdays, function(b){
        		return b.checked;
        	});

        	var curr = new Date(start_date),
                between = [];
            while (curr <= new Date(end_date)) {
                if (applicableDays[uiDay(moment(curr).day())]) {
                    between.push(curr.setHours(0, 0, 0, 0));
                }
                curr.setDate(curr.getDate() + 1);
            }
            //return between;

            $scope.bookingBlackouts = _.map(between, function(b){
            	var blackoutDates = {
            		value : moment(b).format("DD-MM-YYYY"),
            		name : moment(b).format("DD MMM YYYY (ddd)")
            	}
            	return blackoutDates;
            });
            $scope.selectedBookingBlackout = $scope.bookingBlackouts[0].value;
        };

        $scope.checkinRangeOfDates = function(){

        	var start_date = moment($scope.checkin_start_date).format("YYYY-MM-DD");
        	var end_date = moment($scope.checkin_end_date).format("YYYY-MM-DD");

        	var applicableDays = _.map($scope.checkindays, function(b){
        		return b.checked;
        	});

        	var curr = new Date(start_date),
                between = [];
            while (curr <= new Date(end_date)) {
                if (applicableDays[uiDay(moment(curr).day())]) {
                    between.push(curr.setHours(0, 0, 0, 0));
                }
                curr.setDate(curr.getDate() + 1);
            }
            //return between;

            $scope.checkinBlackouts = _.map(between, function(b){
            	var blackoutDates = {
            		value : moment(b).format("DD-MM-YYYY"),
            		name : moment(b).format("DD MMM YYYY (ddd)")
            	}
            	return blackoutDates;
            });
            $scope.selectedCheckinBlackout = $scope.checkinBlackouts[0].value;
        };

        function uiDay(serverDay) {
            return (serverDay + 6) % 7;
        }

        // make array of Booking Blackout Dates
        $scope.bookingBlackoutsList = [];
        $scope.pushBookingBlackouts = function(){
        	if(!(_.some($scope.bookingBlackoutsList, $scope.selectedBookingBlackout))){
        		$scope.bookingBlackoutsList.push($scope.selectedBookingBlackout);
        	}
        }

        // make array of Checkin Blackout Dates
        $scope.checkinBlackoutsList = [];
        $scope.pushCheckinBlackouts = function(){
        	if(!(_.some($scope.checkinBlackoutsList, $scope.selectedCheckinBlackout))){
        		$scope.checkinBlackoutsList.push($scope.selectedCheckinBlackout);
        	}
        }

        // WEEK ARRAY

        $scope.checkindays = [];

        $scope.checkindays = [{
            name: 'Mon',
            checked: true
        }, {
            name: 'Tue',
            checked: true
        }, {
            name: 'Wed',
            checked: true
        }, {
            name: 'Thu',
            checked: true
        }, {
            name: 'Fri',
            checked: true
        }, {
            name: 'Sat',
            checked: true
        }, {
            name: 'Sun',
            checked: true
        }];

        $scope.bookingdays = [];

        $scope.bookingdays = [{
            name: 'Mon',
            checked: true
        }, {
            name: 'Tue',
            checked: true
        }, {
            name: 'Wed',
            checked: true
        }, {
            name: 'Thu',
            checked: true
        }, {
            name: 'Fri',
            checked: true
        }, {
            name: 'Sat',
            checked: true
        }, {
            name: 'Sun',
            checked: true
        }];

        $scope.saveDeal = function() {

        	var getBookingDays = _.map($scope.bookingdays, function(b){
        		return b.checked;
        	});

        	var getCheckinDays = _.map($scope.checkindays, function(c){
        		return c.checked;
        	});

        	var getBookingBlackouts = _.map($scope.bookingBlackoutsList, function(b){
        		return b.value;
        	});

        	var getCheckinBlackouts = _.map($scope.checkinBlackoutsList, function(c){
        		return c.value;
        	});
        	

            var params = {
                "hotel_id": "58726a8e5aa124394eb7dae4",
                "name": $scope.name,
                "description": $scope.desciption,
                "type": $scope.selectedDealType.id,
                "status": $scope.selectedDealStatus.id,
                "check_in_period": {
                    "start_date": moment($scope.checkin_start_date).format('DD-MM-YYYY'),
                    "end_date": moment($scope.checkin_end_date).format('DD-MM-YYYY'),
                    "days": getCheckinDays,
                    "blackout_date": getCheckinBlackouts
                },
                "booking_period": {
                    "start_date": moment($scope.booking_start_date).format('DD-MM-YYYY'),
                    "end_date": moment($scope.booking_end_date).format('DD-MM-YYYY'),
                    "days": getBookingDays,
                    "blackout_date": getBookingBlackouts
                },
                "rooms": $scope.roomsSelected,
                "rate_plans": $scope.rateplansSelected,
                "discount_type": $scope.discount_type,
                "discount_value": $scope.discount_value,
                "applicable_on": $scope.applicable_on
            };

            console.log(params);

            ManageDeals.save(params, function() {
                $state.go('.', {}, { reload: 'rooms' });
            });
        };
    }]);
