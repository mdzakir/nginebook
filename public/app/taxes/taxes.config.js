angular.module("taxes.config", [])
.config(function ($stateProvider) {
	$stateProvider
	.state("base.taxes", {
		url : "/taxes",
		templateUrl : "app/taxes/templates/taxes.html",
		resolve: {
			hotelId: function() {
                return '58726a8e5aa124394eb7dae4';
            },
			viewTaxes : function(ManageTaxes){
				return ManageTaxes.getTaxes();
			},
			getTaxForEdit : function($stateParams, ManageTaxes, hotelId) {
                if ($stateParams.taxId) {
                    return ManageTaxes.getTax(hotelId, $stateParams.taxId);
                }
                return {};
            },
		},
		controller : "TaxesController"
	})
    .state('base.create-tax', {
        url: '/create-tax/:id',
        templateUrl: 'app/taxes/templates/create-tax.html',
        resolve: {
            hotelId: function() {
                return '58726a8e5aa124394eb7dae4';
            },
            viewTaxes : function(ManageTaxes){
                return ManageTaxes.getTaxes();
            },
            tax: function ($stateParams, ManageTaxes, hotelId) {
                if ($stateParams.id) {
                    return ManageTaxes.getTax(hotelId, $stateParams.id);
                }
                return {};
            }
        },
        controller: 'CreateTaxController'
    });
})
.factory('ManageTaxes', function ($http, $q, apiEndPoint) {
    return {
        getTaxes : function(){
            var deferred = $q.defer();
            var viewtaxes = deferred.promise;
            $http.get(apiEndPoint + '/tax/view?hotel_id=58726a8e5aa124394eb7dae4&status=1').then(function(response) {
                var viewtaxes = response.data;
                deferred.resolve(viewtaxes);
            }, function(error) {
                viewtaxes = null;
                deferred.reject(error);
            });
            return viewtaxes;
        },
        getTax: function(hotelId, taxId) {
            var deferred = $q.defer();
            var tax = deferred.promise;
            $http.get(apiEndPoint + '/taxes/view', {
                    params: {
                        hotel_id: hotelId,
                        tax_id: taxId,
                        status: 1

                    }
                })
                .then(function(response) {
                    var tax = response.data;
                    deferred.resolve(tax);
                }, function(error) {
                    tax = null;
                    deferred.reject(error);
                });
            return tax;
        },
        save: function (params, isAdd, callback) {
            var post_url = isAdd ? apiEndPoint + '/taxes/create/' : apiEndPoint + '/taxes/edit/' ;
            $http.post(post_url, angular.toJson(params, true))
                .then(function () {
                    callback();
                });
        },
        deleteTax: function (params, callback) {
            var post_url = apiEndPoint + '/taxes/updateStatus?hotel_id=58726a8e5aa124394eb7dae4&tax_id='+params.tax_id+'&status=3';
            $http.get(post_url)
                .then(function () {
                    callback();
                });
        }
    };
})