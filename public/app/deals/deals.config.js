angular.module("deals.config", [])
.config(function ($stateProvider) {
	$stateProvider
	.state("deals", {
		url : "/deals/:dealId",
		templateUrl : "app/deals/templates/deals.html",
		resolve: {/*
			hotelId: function() {
                return '58726a8e5aa124394eb7dae4';
            },
			viewDeals : function(ManageDeals){
				return ManageDeals.getDeals();
			},
			getDealForEdit : function($stateParams, ManageDeals, hotelId) {
                if ($stateParams.dealId) {
                    return ManageDeals.getDeal(hotelId, $stateParams.dealId);
                }
                return {};
            },*/
		},
		controller : "DealsController"
	})	
})
.factory('ManageDeals', function ($http, $q) {
    return {/*
        getDeals : function(){
            var deferred = $q.defer();
            var viewdeals = deferred.promise;
            $http.get(apiEndPoint + '/deal/view?hotel_id=58726a8e5aa124394eb7dae4&status=1').then(function(response) {
                var viewdeals = response.data;
                debugger;
                console.log(viewdeals);
                deferred.resolve(viewdeals);
            }, function(error) {
                viewdeals = null;
                deferred.reject(error);
            });
            return viewdeals;
        },
        getDeal: function(hotelId, dealId) {
            var deferred = $q.defer();
            var deal = deferred.promise;
            $http.get(apiEndPoint + '/deal/view', {
                    params: {
                        hotel_id: hotelId,
                        deal_id: dealId
                    }
                })
                .then(function(response) {
                    var deal = response.data;
                    deferred.resolve(deal);
                }, function(error) {
                    deal = null;
                    deferred.reject(error);
                });
            return deal;
        },*/
        save: function (params, callback) {
            var post_url = 'http://0.0.0.0:8083/deal/create/';
            $http.post(post_url, angular.toJson(params, true))
                .then(function () {
                    callback();
                });
        }
    };
});