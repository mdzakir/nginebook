angular.module("create-manual-booking.config", [])
    .config(function($stateProvider) {
        $stateProvider
            .state('base.create-manual-booking', {
                url: '/create-manual-booking/:id',
                templateUrl: 'app/bookings/templates/create-manual-booking.html',
                resolve: {
                    hotelId: function() {
                        return '58726a8e5aa124394eb7dae4';
                    },
                    booking: function($stateParams, ManualBooking, hotelId) {
                        if ($stateParams.id) {
                            return ManualBooking.getRoom(hotelId, $stateParams.id);
                        }
                        return {};
                    }
                },
                controller: 'CreateManualBookingController'
            });
    })
    .factory('ManualBooking', function($http, $q, apiEndPoint) {
        return {
            getBookings: function() {
                var deferred = $q.defer();
                var viewbookings = deferred.promise;
                $http.get(apiEndPoint + '/booking/view?hotel_id=58726a8e5aa124394eb7dae4&status=1').then(function(response) {
                    var viewbookings = response.data;
                    deferred.resolve(viewbookings);
                }, function(error) {
                    viewbookings = null;
                    deferred.reject(error);
                });
                return viewbookings;
            },
            getRooms: function() {
                var deferred = $q.defer();
                var viewrooms = deferred.promise;
                $http.get(apiEndPoint + '/room/view?hotel_id=58726a8e5aa124394eb7dae4&status=1').then(function(response) {
                    var viewrooms = response.data;
                    deferred.resolve(viewrooms);
                }, function(error) {
                    viewrooms = null;
                    deferred.reject(error);
                });
                return viewrooms;
            },
            getRateplans: function() {
                var deferred = $q.defer();
                var viewRateplans = deferred.promise;
                $http.get(apiEndPoint + '/rate-plan/view?hotel_id=58726a8e5aa124394eb7dae4&status=1').then(function(response) {
                    var viewRateplans = response.data;
                    deferred.resolve(viewRateplans);
                }, function(error) {
                    viewRateplans = null;
                    deferred.reject(error);
                });
                return viewRateplans;
            },
            booking: function(hotelId, bookingId) {
                var deferred = $q.defer();
                var booking = deferred.promise;
                $http.get(apiEndPoint + '/booking/view', {
                        params: {
                            hotel_id: hotelId,
                            booking_id: bookingId
                        }
                    })
                    .then(function(response) {
                        var booking = response.data;
                        deferred.resolve(booking);
                    }, function(error) {
                        booking = null;
                        deferred.reject(error);
                    });
                return booking;
            },
            save: function(params, callback) {
                var post_url = apiEndPoint + '/booking/createBooking/';
                $http.post(post_url, angular.toJson(params, true))
                    .then(function() {
                        callback();
                    });
            },
            deleteBooking: function(params, callback) {
                var post_url = apiEndPoint + '/booking/updateStatus?hotel_id=58726a8e5aa124394eb7dae4';
                $http.post(post_url, angular.toJson(params, true))
                    .then(function() {
                        callback();
                    });
            }
        };
    })
