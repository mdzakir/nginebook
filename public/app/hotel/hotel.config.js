angular.module("hotel.config", [])
    .config(function($stateProvider) {
        $stateProvider
            .state("base.hotel-basic-details", {
                url: "/hotel-basic-detail",
                templateUrl: "app/hotel/templates/basicDetails.html",
                resolve: {
                    hotelId: function(User) {
                        return User.getHotelID();
                    },
                    viewBasicDetails: function(ManageHotel) {
                        return ManageHotel.getBasicDetails();
                    },
                },
                controller: "HotelBasicDetailController"
            })
            .state("base.hotel-contact-details", {
                url: "/hotel-contact-detail",
                templateUrl: "app/hotel/templates/contactDetails.html",
                resolve: {
                    hotelId: function(User) {
                        return User.getHotelID();
                    },
                    viewContactsDetails: function(ManageHotel) {
                        return ManageHotel.getContactDetails();
                    },
                },

                controller: "HotelContactDetailsController"
            })
            .state("base.hotel-map-details", {
                url: "/hotel-map-detail",
                templateUrl: "app/hotel/templates/hotelMap.html",
                resolve: {
                    hotelId: function(User) {
                        return User.getHotelID();
                    },
                    viewMapDetails: function(ManageHotel) {
                        return ManageHotel.getMapDetails();
                    },
                },

                controller: "HotelMapDetailsController"
            })
    })
    .factory('ManageHotel', function($http, $q, apiEndPoint, User) {
        return {
            getBasicDetails: function() {
                var deferred = $q.defer();
                var viewbasicdetail = deferred.promise;
                $http.get(apiEndPoint + '/hotel/basic?hotel_id='+User.getHotelID()).then(function(response) {
                    var viewbasicdetail = response.data;
                    deferred.resolve(viewbasicdetail);
                }, function(error) {
                    viewbasicdetail = null;
                    deferred.reject(error);
                });
                return viewbasicdetail;
            },
            getContactDetails: function() {
                var deferred = $q.defer();
                var viewcontactsdetail = deferred.promise;
                $http.get(apiEndPoint + '/hotel/contacts?hotel_id='+User.getHotelID()).then(function(response) {
                    var viewcontactsdetail = response.data;
                    deferred.resolve(viewcontactsdetail);
                }, function(error) {
                    viewcontactsdetail = null;
                    deferred.reject(error);
                });
                return viewcontactsdetail;
            },
            getMapDetails: function() {
                var deferred = $q.defer();
                var viewmapdetail = deferred.promise;
                $http.get(apiEndPoint + '/hotel/hotel_map?hotel_id='+User.getHotelID()).then(function(response) {
                    var viewmapdetail = response.data;
                    deferred.resolve(viewmapdetail);
                }, function(error) {
                    viewmapdetail = null;
                    deferred.reject(error);
                });
                return viewmapdetail;
            },
        };
    })
