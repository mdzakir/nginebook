angular.module("rooms.controllers", [
        "rooms.module"
    ])
    .controller('RoomsController', function($state, $scope, ManageRooms, viewRooms, hotelId)     {
        $scope.title = "Rooms";
        $scope.$emit("pageTitleChanged", "Rooms");

        $scope.$on('contextChanged', function () {
            $state.go('.', {}, {reload: 'base.rooms'});
        });

        $scope.hotelId = hotelId;

        // AVAILABLE ROOMS
        $scope.rooms = viewRooms;
        var isAddRoom = _.isEmpty($scope.rooms);

        $scope.deleteRoom = function(room){
            params = {
                "hotel_id": $scope.hotelId,
                "room_id" : room.id,
                "status" : 3
            }
            ManageRooms.deleteRoom(params, function () {
                $state.go('.', {}, { reload: 'base.rooms' });
            });
        };

        $scope.editRoom = function(id){
            $state.go("base.create-room", {"id" : id});
        };

    });
