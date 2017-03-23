angular.module("pricing.config", [])
    .config(function($stateProvider) {
        $stateProvider
            .state("pricing", {
                url: "/pricing",
                templateUrl: "app/pricing/templates/pricing.html",
                resolve: {
                    hotelId: function() {
                        return '58726a8e5aa124394eb7dae4';
                    },
                    // roomId: function() {
                    //     return '58a9ecfc7159cc2806591106';
                    // },
                    // rateplanId: function() {
                    //     return '58c054a47159cc491aa489c3';
                    // },
                    // viewPricing : function(Pricing, hotelId, roomId) {
                    //     return Pricing.getPricing(hotelId, roomId);
                    // }
                },
                controller: "PricingController"
            })
    })
    .factory('Pricing', function($http, $q, apiEndPoint) {
        return {
            month: moment(),
            currentMonth: function() {
                return parseInt(this.month.format('M'));
            },
            currentYear: function() {
                return parseInt(this.month.format('Y'));
            },
            getPricing: function(hotelId, roomId) {
                var deferred = $q.defer();
                var price = deferred.promise;
                $http.get(apiEndPoint + '/room/ViewPricing', {
                        params: {
                            hotel_id: hotelId,
                            room_id: roomId,
                            start_date: "2017-03-01",
                            end_date: "2017-03-31"
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
                var post_url = apiEndPoint + '/rate-plan/price/'
                $http.post(post_url, angular.toJson(params, true))
                    .then(function() {
                        callback();
                    });
            },
        };

    });
