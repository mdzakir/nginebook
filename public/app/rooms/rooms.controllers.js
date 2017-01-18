angular.module("rooms.controllers", [
        "rooms.module"
    ])
    .controller('RoomsController', ['$state', '$scope', 'ManageRooms', 'room', 'viewRooms', 'amenities', function($state, $scope, ManageRooms, room, viewRooms, amenities) {
        $scope.title = "Rooms";
        $scope.$emit("pageTitleChanged", "Rooms");

        // AVAILABLE ROOMS
        $scope.rooms = viewRooms;
        var isAddRoom = _.isEmpty($scope.rooms);

        $scope.room = room || {};

        if(isAddRoom){

        }else{

        }

         /*[{
            name: 'Standard Affordable OYO Rooms Premium',
            src: 'room_1.jpg',
            desc: 'Rooms Hotel Tbilisi Garden View Twin Room R 2. Theater and the brick, the fireplace, the lighter.'
        }, {
            name: 'Deluxe AC Room',
            src: 'room_2.jpg',
            desc: 'Contemporary Boutique Hotel Suite Main Room Interior Design of Atlantic Resort and Spa Ft. Lauderdale.'
        }, {
            name: 'Luxury Room',
            src: 'room_3.jpg',
            desc: 'Alma House Bed and Breakfast: Room 4 with adjoining room. Nice Room For Rent in Phu Nhuan District.'
        }];*/

        // SHOW ADD ROOM FORM
        $scope.showAddRoomForm = false;
        $scope.addRoomForm = function(){
            $scope.showAddRoomForm = true;
        };

        $scope.room.images = [{name:'', img_url : '', order:''}];
        $scope.addImage = function(){
            $scope.images[$scope.images.length] = {};
        };
        $scope.removeImage = function(index){
            $scope.images.splice( index, 1 );        
        };
        $scope.room.amenities = amenities;
        $scope.room.isSmoking = "false";

        // ADD ROOM
        $scope.room = [];
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
            params = {status : 0}
            ManageRooms.deleteRoom(params, isAddRoom, function () {
                $state.go('.', {}, { reload: 'rooms' });
            });
        }

    }]);
