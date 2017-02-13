angular.module("create.room.controllers", [
        "rooms.module"
    ])
    .controller('CreateRoomController', function($state, $scope, $http, $stateParams, ManageRooms, room) {
        
        console.log(room);

        $scope.room = room;

    });
