angular.module("rooms.config", [])
.config(function ($stateProvider) {
	$stateProvider
	.state("base.rooms", {
		url : "/rooms",
		templateUrl : "app/rooms/templates/rooms.html",
		resolve: {
			hotelId: function(AppContext) {
                return AppContext.getHotelId();
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
    .state('base.create-room', {
        url: '/create-room/:id',
        templateUrl: 'app/rooms/templates/create-room.html',
        resolve: {
            hotelId: function(AppContext) {
                return AppContext.getHotelId();
            },
            viewRooms : function(ManageRooms){
                return ManageRooms.getRooms();
            },
            amenities : function(ManageRooms){
                return ManageRooms.getRoomAmenities();
            },
            room: function ($stateParams, ManageRooms, hotelId) {
                if ($stateParams.id) {
                    return ManageRooms.getRoom(hotelId, $stateParams.id);
                }
                return {};
            }
        },
        controller: 'CreateRoomController'
    });
})
.factory('ManageRooms', function ($http, $q, apiEndPoint, AppContext) {
    return {
        getRooms : function(){
            var deferred = $q.defer();
            var viewrooms = deferred.promise;
            debugger;
            $http.get(apiEndPoint + '/room/view?hotel_id='+AppContext.getHotelId()+'&status=1').then(function(response) {
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
            $http.get(apiEndPoint + '/room/view', {
                    params: {
                        hotel_id: hotelId,
                        room_id: roomId,
                        status: 1

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
            var post_url = isAdd ? apiEndPoint + '/room/create/' : apiEndPoint + '/room/edit/' ;
            $http.post(post_url, angular.toJson(params, true))
                .then(function () {
                    callback();
                });
        },
        deleteRoom: function (params, callback) {
            var post_url = apiEndPoint + '/room/updateStatus?hotel_id='+AppContext.getHotelId()+'&room_id='+params.room_id+'&status=3';
            $http.get(post_url)
                .then(function () {
                    callback();
                });
        }
    };
})