angular.module("create.room.controllers", [
        "rooms.module"
    ])
    .controller('CreateRoomController', function($state, $scope, $http, $stateParams, ManageRooms, room, amenities) {
        
        console.log(room);

        $scope.room = room;

        $scope.room.amenities = amenities;

        

    });
