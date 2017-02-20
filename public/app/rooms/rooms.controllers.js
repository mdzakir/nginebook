angular.module("rooms.controllers", [
        "rooms.module"
    ])
    .controller('RoomsController', function($state, $scope, ManageRooms, getRoomForEdit, viewRooms, amenities) {
        $scope.title = "Rooms";
        $scope.$emit("pageTitleChanged", "Rooms");

        // AVAILABLE ROOMS
        $scope.rooms = viewRooms;
        var isAddRoom = _.isEmpty($scope.rooms);

        $scope.room = getRoomForEdit || {};

        if(isAddRoom){

        }else{
            $scope.showAddRoomForm = true;
        }
        // SHOW ADD ROOM FORM
        $scope.showAddRoomForm = false;
        $scope.addRoomForm = function(){
            $state.go('create-room');
        };

        $scope.room.images = [{name:'', img_url : '', order:''}];
        $scope.addImage = function(){
            $scope.room.images[$scope.room.images.length] = {};
        };
        $scope.removeImage = function(index){
            $scope.room.images.splice( index, 1 );        
        };
        $scope.room.amenities = amenities;

        $scope.room.isSmoking = "false";

        // ADD ROOM
        
        $scope.saveAddRoom = function(){
            $scope.room.selectedAmenities = _.filter($scope.amenities, 'checked');
            var params = {
                "hotel_id": "58726a8e5aa124394eb7dae4",
                "name": $scope.room.name,
                "description": $scope.room.description,
                "type" : $scope.room.type,
                "status" : 1,
                "is_smoking" : $scope.room.isSmoking,
                "max_adult" : $scope.room.max_adult,
                "amenities" : $scope.room.selectedAmenities,
                "images" : $scope.room.images
            };

            ManageRooms.save(params, isAddRoom, function () {
                $state.go('.', {}, { reload: 'rooms' });
            });
        };

        $scope.deleteRoom = function(room){
            params = {
                "hotel_id": "58726a8e5aa124394eb7dae4",
                "room_id" : room.id,
                "status" : 3
            }
            ManageRooms.deleteRoom(params, function () {
                $state.go('.', {}, { reload: 'rooms' });
                //$state.go('rooms', {'roomId': rule.id});
            });
        };

        $scope.editRoom = function(id){
            $state.go("create-room", {"id" : id});
        };

    });
