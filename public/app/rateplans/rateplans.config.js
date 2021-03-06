angular.module("rateplans.config", [])
.config(function ($stateProvider) {
	$stateProvider
	.state("base.rateplans", {
		url : "/rateplans",
		templateUrl : "app/rateplans/templates/rateplans.html",
		resolve: {
			hotelId: function(User) {
                return User.getHotelID();
            },
			viewRateplans : function(ManageRateplans){
				return ManageRateplans.getRateplans();
			},
			getRateplanForEdit : function($stateParams, ManageRateplans, hotelId) {
                if ($stateParams.rateplanId) {
                    return ManageRateplans.getRateplan(hotelId, $stateParams.rateplanId);
                }
                return {};
            }
		},
		controller : "RateplansController"
	})
    .state('base.create-rateplan', {
        url: '/create-rateplan/:id',
        templateUrl: 'app/rateplans/templates/create-rateplan.html',
        resolve: {
            hotelId: function(User) {
                return User.getHotelID();
            },
            viewRateplans : function(ManageRateplans){
                return ManageRateplans.getRateplans();
            },
            rateplan: function ($stateParams, ManageRateplans, hotelId) {
                if ($stateParams.id) {
                    return ManageRateplans.getRateplan(hotelId, $stateParams.id);
                }
                return {};
            }
        },
        controller: 'CreateRateplanController'
    });
})
.factory('ManageRateplans', function ($http, $q, apiEndPoint, User) {
    return {
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
            return viewrateplans;
        },
        getRateplan: function(hotelId, rateplanId) {
            var deferred = $q.defer();
            var rateplan = deferred.promise;
            $http.get(apiEndPoint + '/ratePlan/view', {
                    params: {
                        hotel_id: hotelId,
                        rateplan_id: rateplanId
                    }
                })
                .then(function(response) {
                    var rateplan = response.data;
                    deferred.resolve(rateplan);
                }, function(error) {
                    rateplan = null;
                    deferred.reject(error);
                });
            return rateplan;
        },
        save: function (params, isAdd, callback) {
            var post_url = apiEndPoint + '/ratePlan/create/';
            $http.post(post_url, angular.toJson(params, true))
                .then(function () {
                    callback();
                });
        },
        deleteRateplan: function (params, callback) {
            var post_url = apiEndPoint + '/ratePlan/updateStatus?hotel_id='+User.getHotelID()+'&rate_id='+params.rateplan_id+'&status=3';
            $http.get(post_url)
                .then(function () {
                    callback();
                }); 
        }
    };
})