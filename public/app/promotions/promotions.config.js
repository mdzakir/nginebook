angular.module("promotions.config", [])
.config(function ($stateProvider) {
	$stateProvider
	.state("promotions", {
		url : "/promotions/:promotionId",
		templateUrl : "app/promotions/templates/promotions.html",
		resolve: {/*
			hotelId: function() {
                return '58726a8e5aa124394eb7dae4';
            },
			viewPromotions : function(ManagePromotions){
				return ManagePromotions.getPromotions();
			},
			getPromotionForEdit : function($stateParams, ManagePromotions, hotelId) {
                if ($stateParams.promotionId) {
                    return ManagePromotions.getPromotion(hotelId, $stateParams.promotionId);
                }
                return {};
            },*/
		},
		controller : "PromotionsController"
	})	
})
.factory('ManagePromotions', function ($http, $q) {
    return {/*
        getPromotions : function(){
            var deferred = $q.defer();
            var viewpromotions = deferred.promise;
            $http.get(apiEndPoint + '/promotion/view?hotel_id=58726a8e5aa124394eb7dae4&status=1').then(function(response) {
                var viewpromotions = response.data;
                deferred.resolve(viewpromotions);
            }, function(error) {
                viewpromotions = null;
                deferred.reject(error);
            });
            return viewpromotions;
        },
        getPromotion: function(hotelId, promotionId) {
            var deferred = $q.defer();
            var promotion = deferred.promise;
            $http.get(apiEndPoint + '/promotion/view', {
                    params: {
                        hotel_id: hotelId,
                        promotion_id: promotionId
                    }
                })
                .then(function(response) {
                    var promotion = response.data;
                    deferred.resolve(promotion);
                }, function(error) {
                    promotion = null;
                    deferred.reject(error);
                });
            return promotion;
        },*/
        save: function (params, callback) {
            var post_url = 'http://0.0.0.0:8000/promotion/create/';
            $http.post(post_url, angular.toJson(params, true))
                .then(function () {
                    callback();
                });
        }
    };
});