angular.module("create-manual-booking.controllers", [
        "manual-booking.module"
    ])
    .controller('CreateManualBookingController', function($state, $scope, ManualBooking) {
        $scope.title = "Create Manual Booking";
        $scope.$emit("pageTitleChanged", "Create Manual Booking");

        // Datepickers
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
        
        // Select options
        $scope.noOfAdults = [
          {id: '1', name: '1'},
          {id: '2', name: '2'},
          {id: '3', name: '3'},
          {id: '4', name: '4'}
        ];
        $scope.selectedNoOfAdult = $scope.noOfAdults[0];

        $scope.noOfChildren = [
          {id: '1', name: '1'},
          {id: '2', name: '2'},
          {id: '3', name: '3'},
          {id: '4', name: '4'}
        ];
        $scope.selectedNoOfChildren = $scope.noOfChildren[0];

        $scope.rooms = [
          {id: '1', name: 'Standard'},
          {id: '2', name: 'Deluxe'},
          {id: '3', name: 'Luxury'},
          {id: '4', name: 'Suite'}
        ];
        $scope.selectedRoom = $scope.rooms[0];

        $scope.ratePlans = [
          {id: '1', name: 'CP'},
          {id: '2', name: 'EP'},
          {id: '3', name: 'DP'},
          {id: '4', name: 'PP'}
        ];
        $scope.selectedRateplan = $scope.ratePlans[0];

        $scope.noOfRooms = [
          {id: '1', name: '1'},
          {id: '2', name: '2'},
          {id: '3', name: '3'},
          {id: '4', name: '4'}
        ];
        $scope.selectedNoOfRoom = $scope.noOfRooms[0];

        $scope.paymentType = [
          {id: '1', name: 'Pay at hotel'},
          {id: '2', name: 'Pay at checkout'}
        ];
        $scope.selectedPaymentType = $scope.paymentType[0];

        $scope.segmentType = [
          {id: '1', name: 'Corporate'},
          {id: '2', name: 'Individual'}
        ];
        $scope.selectedSegmentType = $scope.segmentType[0];

        $scope.sourceOfBooking = [
          {id: '1', name: 'OFFLINE'},
          {id: '2', name: 'ONLINE'}
        ];
        $scope.selectedSourceOfBooking = $scope.sourceOfBooking[0];



        $scope.saveManualBooking = function(){
            var params = {
                "hotel_id": "58726a8e5aa124394eb7dae4",
                "refrence_id": "RTY2349",
                "checkin_date": moment($scope.start_date).format("YYYY-MM-DD"),
                "checkout_date": moment($scope.end_date).format("YYYY-MM-DD"),
                "no_of_adults": $scope.selectedNoOfAdult.id,
                "no_of_child": $scope.selectedNoOfChildren.id,
                "room_id": $scope.selectedRoom.id,
                "rate_id": $scope.selectedRateplan.id,
                "total_amount": $scope.totalAmount,
                "total_tax": $scope.totalTax,
                "guest_name": $scope.guestName,
                "guest_mobile": $scope.guestMobile,
                "guest_email": $scope.guestEmail,
                "guest_address": $scope.guestAddress,
                "no_of_rooms": $scope.selectedNoOfRoom.id,
                "payment_type": $scope.selectedPaymentType.id,
                "segment": $scope.selectedSegmentType.id,
                "Source": $scope.selectedSourceOfBooking.id,
                "special_request": $scope.specialRequest,
            };

            ManualBooking.save(params, function () {
                $state.go('bookings');
            });
        };

    });
