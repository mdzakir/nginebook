angular.module("pricing.config", [])
    .config(function($stateProvider) {
        $stateProvider
            .state("base.pricing", {
                url: "/pricing",
                templateUrl: "app/pricing/templates/pricing.html",
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
                    viewRateplans: function(Pricing) {
                        return Pricing.getRateplans();
                    },
                    ratePlanId: function(viewRateplans) {
                        return viewRateplans[0];
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
                    viewPricing : function(Pricing, hotelId, roomId, ratePlanId, dateRange) {
                        return Pricing.getPricing(hotelId, roomId, ratePlanId, dateRange);
                    }
                },
                controller: "PricingController"
            })
    })
    .factory('Pricing', function($http, $q, apiEndPoint, User) {
        return {
            month: moment(),
            currentMonth: function() {
                return parseInt(this.month.format('M'));
            },
            currentYear: function() {
                return parseInt(this.month.format('Y'));
            },
            viewRooms: function(ManageInventory) {
                return ManageInventory.getRooms();
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
            getRateplans : function(){
                var deferred = $q.defer();
                var viewrateplans = deferred.promise;
                $http.get(apiEndPoint + '/ratePlan/view?hotel_id='+User.getHotelID()+'&status=1').then(function(response) {
                    var viewrateplans = response.data;
                    deferred.resolve(viewrateplans);
                }, function(error) {
                    viewrateplans = null;
                    deferred.reject(error);
                });
                debugger;
                return viewrateplans;
            },
            getPricing: function(hotelId, roomId, ratePlanId, dateRange) {
                var deferred = $q.defer();
                var price = deferred.promise;
                $http.get(apiEndPoint + '/ratePlan/pricing/', {
                        params: {
                            hotel_id: hotelId,
                            room_id: roomId,
                            rate_id: ratePlanId,
                            start_date: moment(dateRange.startDate).format('YYYY-MM-DD'),
                            end_date: moment(dateRange.endDate).format('YYYY-MM-DD')
                        }
                    })
                    .then(function(response) {
                        var price = response.data;
                        deferred.resolve(price);
                    }, function(error) {
                        price = null;
                        deferred.reject(error);
                    });
                return price;
            },
            updatePricing: function(params, callback) {
                console.log(params);
                var post_url = apiEndPoint + '/ratePlan/price/'
                $http.post(post_url, angular.toJson(params, true))
                    .then(function() {
                        callback();
                    });
            },
        };

    });
