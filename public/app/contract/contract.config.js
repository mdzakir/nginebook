angular.module("contract.config", [])
.config(function ($stateProvider) {
	$stateProvider
	.state("base.contract", {
		url : "/addOns",
		templateUrl : "app/addOns/templates/addOns.html",
		resolve: {
			hotelId: function() {
                return '58726a8e5aa124394eb7dae4';
            },
			viewAddOns : function(ManageAddOns){
				return ManageAddOns.getAddOns();
			},
		},
		controller : "ContractController"
	})
    .state('base.create-contract', {
        url: '/addOns/:id',
        templateUrl: 'app/addOns/templates/create-addOns.html',
        resolve: {
            hotelId: function() {
                return '58726a8e5aa124394eb7dae4';
            },
            viewAddOns : function(ManageAddOns){
                return ManageAddOns.getAddOns();
            },
            addOn : function($stateParams, ManageAddOns, hotelId) {
            if ($stateParams.id) {
                return ManageAddOns.getAddOn(hotelId, $stateParams.id);
            }
            return {};
            }
        },

        controller: 'CreateContractController'
    });
})
.factory('ManageContract', function ($http, $q, apiEndPoint) {
    return {
        getAddOns: function(){
            var deferred = $q.defer();
            var viewaddons = deferred.promise;
            $http.get(apiEndPoint + '/addOns/view?hotel_id=58726a8e5aa124394eb7dae4').then(function(response) {
                var viewaddons = response.data;
                deferred.resolve(viewaddons);
            }, function(error) {
                viewaddons = null;
                deferred.reject(error);
            });
            return viewaddons;
        },
        save: function (params, isAdd, callback) {
            var post_url = isAdd ? apiEndPoint + '/addOns/create/' : apiEndPoint + '/addOns/edit/' ;
            $http.post(post_url, angular.toJson(params, true))
                .then(function () {
                    callback();
                });
        },
        getAddOn: function(hotelId, addOnId) {
            var deferred = $q.defer();
            var addOn = deferred.promise;
            $http.get(apiEndPoint + '/addOns/view', {
                    params: {
                        hotel_id: hotelId,
                        id: addOnId
                    }
                })
                .then(function(response) {
                    var addOn = response.data;
                    deferred.resolve(addOn[0]);
                }, function(error) {
                    addOn = null;
                    deferred.reject(error);
                });
            return addOn;
        },
    };
})
