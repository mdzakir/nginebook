angular.module("base.config", [])
    .config(function($stateProvider) {
        $stateProvider
            .state("base", {
                abstract: true,
                templateUrl: "app/base/templates/base.html",
                resolve: {
                    hotels: function (UserHotels) {
                        return UserHotels.get();
                    },
                    hotelId: function(AppContext) {
                        return AppContext.getHotelId();
                    }
                },
                controller: "BaseController"
            })

    })
    .factory('AppContext', function($q, UserHotels, User) {
        var hotelId;
        return {
            changeHotel: function (hid) {
                hotelId = hid;
                $rootScope.$broadcast('hotelChanged', {'hid': hid});
                notifyContextChange(this);
            },
            getHotelId: function() {
                if (hotelId) {
                    return hotelId;
                } else {
                    var deferred = $q.defer();
                    console.log(UserHotels.get());
                    UserHotels.get().then(function(hotels) {
                        hotelId = User.getHotelID();
                        deferred.resolve(hotelId);
                    });
                    return deferred.promise;
                }
            },
            reset: function () {
                hotelId = null;
                UserHotels.reset();
                dates = [new Date()];
            }
        };
        function notifyContextChange(context) {
            if (hotelId) $rootScope.$broadcast('contextChanged', context);
        }
    })
    .factory('UserHotels', function($q, $http,User,apiEndPoint) {
        var hotels;
        return {
            get: function() {
                if (hotels) {
                    return hotels;
                } else {
                    var deferred = $q.defer();
                    hotels = deferred.promise;
                    $http.get(apiEndPoint + '/user/products?id='+User.getEmail())
                    //$http.get('jsonData/hotels.json')
                        .then(function(response) {
                            hotels = response.data;
                            deferred.resolve(hotels);
                        }, function(error) {
                            hotels = null;
                            deferred.reject(error);
                        });

                    return hotels;
                }
            },
            reset: function() {
                hotels = null;
            }
        };
    })
