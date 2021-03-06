angular.module("inventory.config", [])
    .config(function($stateProvider) {
        $stateProvider
            .state("base.inventory", {
                url: "/inventory",
                templateUrl: "app/inventory/templates/inventory.html",
                resolve: {
                    hotelId: function(User) {
                        return User.getHotelID();
                    },
                    viewRooms : function(ManageRooms){
                        return ManageRooms.getRooms();
                    },
                    roomId: function(viewRooms) {
                        return viewRooms[0];
                    },
                    dateRange : function(){
                        if(!localStorage.startDate){
                            var start = moment();
                            if(localStorage.startDate){
                                start = localStorage.startDate;
                            }
                            var end = moment(start).add(14, 'days');
                            localStorage.startDate = start;
                            localStorage.endDate = end;
                        }
                        return localStorage;
                    },
                    viewInventory: function(ManageInventory, hotelId, roomId, dateRange) {
                        return ManageInventory.getInventory(hotelId, roomId, dateRange);
                    }
                },
                controller: "InventoryController"
            })
    })
    .factory('ManageInventory', function($http, $q, apiEndPoint, User) {
        return {
            month: moment(),
            currentMonth: function() {
                return parseInt(this.month.format('M'));
            },
            currentYear: function() {
                return parseInt(this.month.format('Y'));
            },
            getRooms: function() {
                var deferred = $q.defer();
                var viewrooms = deferred.promise;
                $http.get(apiEndPoint + '/room/view?hotel_id='+User.getHotelID()+'&status=1').then(function(response) {
                    var viewrooms = response.data;
                    deferred.resolve(viewrooms);
                }, function(error) {
                    viewrooms = null;
                    deferred.reject(error);
                });
                return viewrooms;
            },
            getInventory: function(hotelId, roomId, dateRange) {
                var deferred = $q.defer();
                var inventory = deferred.promise;
                $http.get(apiEndPoint + '/room/inventoryView', {
                        params: {
                            hotel_id: hotelId,
                            room_id: roomId,
                            start_date: moment(dateRange.startDate).format('YYYY-MM-DD'),
                            end_date: moment(dateRange.endDate).format('YYYY-MM-DD')
                        }
                    })
                    .then(function(response) {
                        var inventory = response.data;
                        deferred.resolve(inventory);
                    }, function(error) {
                        inventory = null;
                        deferred.reject(error);
                    });
                return inventory;
            },
            updateInv: function(params, callback) {
                var post_url = apiEndPoint + '/room/inventory/';
                $http.post(post_url, angular.toJson(params, true))
                    .then(function() {
                        callback();
                    });
            },
        };

    });
