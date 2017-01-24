angular.module("manual-booking.config", [])
.config(function ($stateProvider) {
	$stateProvider
	.state("manual-booking", {
		url : "/manual-booking",
		templateUrl : "app/manual-booking/templates/manual-booking.html",
		resolve: {
			hotelId: function() {
                return '58726a8e5aa124394eb7dae4';
            },
			viewRooms : function(ManualBooking){
				return ManualBooking.getRooms();
			},
            viewRateplans : function(ManualBooking){
                return ManualBooking.getRateplans();
            },
			amenities : function(ManualBooking){
				return ManualBooking.getRoomAmenities();
			},
			room : function($stateParams, ManualBooking, hotelId) {
                if (Number($stateParams.roomId)) {
                    return ManualBooking.room(hotelId, $stateParams.roomId);
                }
                return {};
            },
		},
		controller : "ManualBookingController"
	})
})
.factory('ManualBooking', function ($http, $q) {
    return {
        getRooms : function(){
            var deferred = $q.defer();
            var viewrooms = deferred.promise;
            $http.get('http://0.0.0.0:8083/room/view?hotel_id=58726a8e5aa124394eb7dae4&status=1').then(function(response) {
                var viewrooms = response.data;
                deferred.resolve(viewrooms);
            }, function(error) {
                viewrooms = null;
                deferred.reject(error);
            });
            return viewrooms;
        },
        getRateplans : function(){
            var deferred = $q.defer();
            var viewRateplans = deferred.promise;
            $http.get('http://0.0.0.0:8083/rate-plan/view?hotel_id=58726a8e5aa124394eb7dae4&status=1').then(function(response) {
                var viewRateplans = response.data;
                deferred.resolve(viewRateplans);
            }, function(error) {
                viewRateplans = null;
                deferred.reject(error);
            });
            return viewRateplans;
        },
        getRoomAmenities: function() {
            var deferred = $q.defer();
            var amenities = deferred.promise;
            $http.get('http://0.0.0.0:8083/hotel/amenities').then(function(response) {
                var amenities = response.data;
                deferred.resolve(amenities);
            }, function(error) {
                amenities = null;
                deferred.reject(error);
            });
            return amenities;
        },
        room: function(hotelId, roomId) {
            var deferred = $q.defer();
            var room = deferred.promise;
            $http.get('http://0.0.0.0:8083/room/view', {
                    params: {
                        hotel_id: hotelId,
                        room_id: roomId
                    }
                })
                .then(function(response) {
                    var room = response.data;
                    deferred.resolve(room);
                }, function(error) {
                    room = null;
                    deferred.reject(error);
                });
            return room;
        },
        save: function (params, isAdd, callback) {
            var post_url = 'http://0.0.0.0:8083/createBooking/';
            $http.post(post_url, angular.toJson(params, true))
                .then(function () {
                    callback();
                });
        },
        deleteRoom: function (params, callback) {
            var post_url = 'http://0.0.0.0:8083/room/updateStatus?hotel_id=58726a8e5aa124394eb7dae4';
            $http.post(post_url, angular.toJson(params, true))
                .then(function () {
                    callback();
                });
        }
    };
})