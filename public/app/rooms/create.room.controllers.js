angular.module("create.room.controllers", [
        "rooms.module"
    ])
    .controller('CreateRoomController', function($state, $scope, $http, $stateParams, ManageRooms, room, amenities, viewRooms) {
        
        $scope.room = room[0];

        $scope.room.amenities = amenities;

        // AVAILABLE ROOMS
        $scope.rooms = viewRooms;
        var isAddRoom = _.isEmpty($scope.rooms);

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


        $scope.saveAddRoom = function(){
            $scope.room.selectedAmenities = _.filter($scope.room.amenities, 'checked');
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
                $state.go('rooms');
            });
        };
        

    });
