angular.module("create.tax.controllers", [
        "taxes.module"
    ])
    .controller('CreateTaxController', function($state, $scope, $http, $stateParams, ManageTaxes, tax) {

        $scope.tax = tax[0] || {};
        var isAddTax = _.isEmpty($scope.tax);

        if (isAddTax) {
            $scope.tax.amenities = amenities;
            $scope.tax.images = [{ name: '', url: '', order: '' }];
            $scope.tax.type = "AC";
        } else {
            $scope.tax.max_adult = Number($scope.tax.max_adult);
            $scope.showAddTaxForm = true;
        }

        // Save Tax
        $scope.saveTax = function() {

            var params = {
                "product_id": "wewewewew2131",
                "details": [{
                    "tax_type": 1,
                    "tax_value": 20,
                    "rate_id" : null
                }, {
                    "tax_type": 1,
                    "tax_value": 20,
                    "rate_id" : null
                }],
                "tax_type": 1
            };

            ManageTaxes.save(params, isAddTax, function() {
                $state.go('.', {}, { reload: 'taxes' });
            });
        };

    });
