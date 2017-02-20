angular.module("create.room.controllers", [
        "rooms.module"
    ])
    .controller('CreateRoomController', function($state, $scope, $http, $stateParams, ManageRooms, room, amenities, viewRooms) {
        
        $scope.room = room[0] || {};

        // AVAILABLE ROOMS
        var isAddRoom = _.isEmpty($scope.room);

        if(isAddRoom){
            $scope.room.amenities = amenities;
            $scope.room.images = [{name:'', url : '', order:''}];
            $scope.room.type = "AC";
        }else{
            $scope.room.max_adult = Number($scope.room.max_adult);

            /*angular.forEach($scope.room.amenities, function (value, key) {
                value.checked = $scope.rule.days[key];
            });*/

            $scope.showAddRoomForm = true;
        }
        // SHOW ADD ROOM FORM
        $scope.showAddRoomForm = false;
        $scope.addRoomForm = function(){
            $state.go('create-room');
        };

        
        $scope.addImage = function(){
            $scope.room.images[$scope.room.images.length] = {};
        };
        $scope.removeImage = function(index){
            $scope.room.images.splice( index, 1 );        
        };

        $scope.room.isSmoking = "false";


        $scope.saveAddRoom = function(){
            /*$scope.room.selectedAmenities = _.filter($scope.room.amenities, 'checked');*/
            var params = {
                "room_id": _.isEmpty($scope.room) ? " " : $scope.room.id,
                "hotel_id": "58726a8e5aa124394eb7dae4",
                "name": $scope.room.name,
                "description": $scope.room.description,
                "type" : $scope.room.type,
                "status" : 1,
                "is_smoking" : !$scope.room.isSmoking,
                "max_adult" : Number($scope.room.max_adult),
                "amenities" : $scope.room.amenities,
                "images" : $scope.room.images
            };

            ManageRooms.save(params, isAddRoom, function () {
                $state.go('rooms');
            });
        };
        

    });
