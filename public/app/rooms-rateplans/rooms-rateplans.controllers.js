angular.module("rooms-rateplans.controllers", [
        "rooms-rateplans.module"
    ])
    .factory('RoomsRateplans', function($http) {
        return {
            month: moment(),
            currentMonth: function() {
                return parseInt(this.month.format('M'));
            },
            currentYear: function() {
                return parseInt(this.month.format('Y'));
            },
            get: function(hotelId, roomId, ratePlanId) {
                return $http.get('/hotel/optimize/?hotel_id=' + hotelId + '&room_id=' + roomId + '&rate_id=' + ratePlanId + '&date=' + this.currentMonth() + '-' + this.currentYear());
            },
            save: function(hotelId, data) {
                return $http.post('/hotel/override', data);
            }
        };
    })
    .factory('ManageRooms', function ($http, $q) {
        return {
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
            save: function (params, isAdd, callback) {
                var post_url = 'http://0.0.0.0:8083/room/create/';
                $http.post(post_url, angular.toJson(params, true))
                    .then(function () {
                        callback();
                    });
            }
        }
    })
    .factory('ManageRateplans', function ($http) {
        return {
            save: function (params, isAdd, callback) {
                var post_url = isAdd ? '/hotel/addrateplan/' : '/hotel/editrateplan/';
                $http.post(post_url, angular.toJson(params, true))
                    .then(function () {
                        callback();
                    });
            }
        }
    })
    .controller('RoomsRateplansController', ['$scope', 'RoomsRateplans', 'ManageRooms', 'ManageRateplans', 'amenities', function($scope, RoomsRateplans, ManageRooms, ManageRateplans, amenities) {
        $scope.title = "RoomsRateplans";
        $scope.$emit("pageTitleChanged", "RoomsRateplans");

        // DATE PICKER

        $scope.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        $scope.open_start = function() {
            $scope.start_date_popup.opened = true;
        };

        $scope.open_end = function() {
            $scope.end_date_popup.opened = true;
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd MMM yyyy', 'shortDate'];
        $scope.format = $scope.formats[2];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.start_date_popup = {
            opened: false
        };

        $scope.end_date_popup = {
            opened: false
        };

        // AVAILABLE ROOMS
        var isAddRoom = _.isEmpty($scope.rooms);

        $scope.rooms = [{
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
        }];

        // Room Images
        $scope.images = [{img_url : ''}]

        $scope.addImage = function(){
            $scope.images[$scope.images.length] = {};
        };
        $scope.removeImage = function(index){
            $scope.images.splice( index, 1 );        
        };

        // Room Amenities

        $scope.amenities = amenities;
        

        // SHOW ADD ROOM FORM
        $scope.showAddRoomForm = false;
        $scope.addRoomForm = function(){
            $scope.showAddRoomForm = true;
        };

        // ADD ROOM
        $scope.room = [];
        $scope.saveAddRoom = function(){
            $scope.selectedAmenities = _.filter($scope.amenities, 'checked');
            var params = {
                "hotel_id": "58726a8e5aa124394eb7dae4",
                "name": $scope.room.name,
                "description": $scope.room.description,
                "type" : $scope.room.type,
                "status" : 1,
                "is_smoking" : $scope.room.isSmoking,
                "max_adult" : $scope.room.max_adult,
                "amenities" : $scope.selectedAmenities,
                "images" : $scope.images
            };

            ManageRooms.save(params, isAddRoom, function () {
                $state.go('rooms-rateplans');
            });
        };

        // AVAILABLE RATEPLANS
        var isAddRateplans = _.isEmpty($scope.rateplans);

        $scope.rateplans = [{
            name: 'CP Customized',
            src: 'room_1.jpg',
            desc: 'Rooms Hotel Tbilisi Garden View Twin Room R 2. Theater and the brick, the fireplace, the lighter.'
        }, {
            name: '4 nights 3 days',
            src: 'room_2.jpg',
            desc: 'Contemporary Boutique Hotel Suite Main Room Interior Design of Atlantic Resort and Spa Ft. Lauderdale.'
        }, {
            name: 'Summer Rateplan',
            src: 'room_3.jpg',
            desc: 'Alma House Bed and Breakfast: Room 4 with adjoining room. Nice Room For Rent in Phu Nhuan District.'
        }];

        // ADD ROOM
        $scope.saveAddRateplan = function(){
            var params = {
                name : $scope.room.name,
                desc : $scope.room.desc,
                images : $scope.room.images,
                type : $scope.room.type,
                min_adult : $scope.room.min_adult,
                max_adult : $scope.room.max_adult,
                amenities : $scope.room.amenities
            };

            ManageRateplans.save(params, isAddRateplans, function () {
                $state.go('rooms-rateplans');
            });
        };
        
    }]);
