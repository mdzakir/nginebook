angular.module("manual-booking.controllers", [
        "manual-booking.module"
    ])
    .controller('ManualBookingController', function($state, $scope, ManualBooking) {
        $scope.title = "Manual Booking";
        $scope.$emit("pageTitleChanged", "Manual Booking");

    });
