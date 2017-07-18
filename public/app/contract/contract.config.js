angular.module("contract.config", [])
.config(function ($stateProvider) {
	$stateProvider
	.state("base.contract", {
		url : "/contract",
		templateUrl : "app/contract/templates/contract.html",
		resolve: {
			hotelId: function() {
                return '58726a8e5aa124394eb7dae4';
            },
			viewContract : function(ManageContract){
				return ManageContract.getContract();
			},
		},
		controller : "ContractController"
	})
    .state('base.create-contract', {
        url: '/contract/:id',
        templateUrl: 'app/contract/templates/create-contract.html',
        resolve: {
            hotelId: function() {
                return '58726a8e5aa124394eb7dae4';
            },
            viewContract : function(ManageContract){
                return ManageContract.getContract();
            },
            contract : function($stateParams, ManageContract, hotelId) {
            if ($stateParams.id) {
                return ManageContract.getContract(hotelId, $stateParams.id);
            }
            return {};
            }
        },

        controller: 'CreateContractController'
    });
})
.factory('ManageContract', function ($http, $q, apiEndPoint) {
    return {
        getContract: function(){
            var deferred = $q.defer();
            var viewcontract = deferred.promise;
            $http.get(apiEndPoint + '/contract/view').then(function(response) {
                var viewcontract = response.data;
                deferred.resolve(viewcontract);
            }, function(error) {
                viewcontract = null;
                deferred.reject(error);
            });
            return viewcontract;
        },
        save: function (params, isAdd, callback) {
            var post_url = isAdd ? apiEndPoint + '/contract/create/' : apiEndPoint + 'contract/create/' ;
            $http.post(post_url, angular.toJson(params, true))
                .then(function () {
                    callback();
                });
        },
    };
})
