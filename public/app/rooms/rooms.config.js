angular.module("rooms.config", [])
.config(function ($stateProvider) {
	$stateProvider
	.state("rooms", {
		url : "/rooms/:roomId",
		templateUrl : "app/rooms/templates/rooms.html",
		resolve: {
			hotelId: function() {
                return '58726a8e5aa124394eb7dae4';
            },
			viewRooms : function(ManageRooms){
				return ManageRooms.getRooms();
			},
			amenities : function(ManageRooms){
				return ManageRooms.getRoomAmenities();
			},
			getRoomForEdit : function($stateParams, ManageRooms, hotelId) {
                if ($stateParams.roomId) {
                    return ManageRooms.getRoom(hotelId, $stateParams.roomId);
                }
                return {};
            },
		},
		controller : "RoomsController"
	})
})
.factory('ManageRooms', function ($http, $q) {
    return {
        getRooms : function(){
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
        getRoomAmenities: function() {
            var deferred = $q.defer();
            var amenities = deferred.promise;
            $http.get(apiEndPoint + '/hotel/amenities').then(function(response) {
                var amenities = response.data;
                deferred.resolve(amenities);
            }, function(error) {
                amenities = null;
                deferred.reject(error);
            });
            return amenities;
        },
        getRoom: function(hotelId, roomId) {
            var deferred = $q.defer();
            var room = deferred.promise;
            $http.get(apiEndPoint + '/room/create', {
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
            var post_url = apiEndPoint + '/room/create/';
            $http.post(post_url, angular.toJson(params, true))
                .then(function () {
                    callback();
                });
        },
        deleteRoom: function (params, isAdd, callback) {
            var post_url = apiEndPoint + '/room/updateStatus?hotel_id=58726a8e5aa124394eb7dae4';
            $http.post(post_url, angular.toJson(params, true))
                .then(function () {
                    callback();
                });
        }
    };
})