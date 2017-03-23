angular.module("inventory.config", [])
    .config(function($stateProvider) {
        $stateProvider
            .state("inventory", {
                url: "/inventory",
                templateUrl: "app/inventory/templates/inventory.html",
                resolve: {
                    hotelId: function() {
                        return '58726a8e5aa124394eb7dae4';
                    },
                    roomId: function() {
                        return '58a9ecfc7159cc2806591106';
                    },
                    viewRooms: function(ManageInventory) {
                        return ManageInventory.getRooms();
                    },
                    viewInventory: function(ManageInventory, hotelId, roomId) {
                        return ManageInventory.getInventory(hotelId, roomId);
                    },
                },
                controller: "InventoryController"
            })
    })
    .factory('ManageInventory', function($http, $q, apiEndPoint) {
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
                $http.get(apiEndPoint + '/room/view?hotel_id=58726a8e5aa124394eb7dae4&status=1').then(function(response) {
                    var viewrooms = response.data;
                    deferred.resolve(viewrooms);
                }, function(error) {
                    viewrooms = null;
                    deferred.reject(error);
                });
                return viewrooms;
            },
            getInventory: function(hotelId, roomId) {
                var deferred = $q.defer();
                var inventory = deferred.promise;
                $http.get(apiEndPoint + '/room/viewInventory', {
                        params: {
                            hotel_id: hotelId,
                            room_id: roomId,
                            start_date: "2017-03-01",
                            end_date: "2017-03-31"
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
