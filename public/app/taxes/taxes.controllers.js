angular.module("taxes.controllers", [
        "taxes.module"
    ])
    .controller('TaxesController', function($state, $scope, ManageTaxes, getTaxForEdit, viewTaxes) {
        $scope.title = "Taxes";
        $scope.$emit("pageTitleChanged", "Taxes");

        // Available Taxes
        $scope.taxes = viewTaxes;
        var isAddTax = _.isEmpty($scope.taxes);

        $scope.tax = getTaxForEdit || {};
        // Show Add Taxes Form
        $scope.addTaxForm = function(){
            $state.go('create-tax');
        };
        $scope.deleteTax = function(tax){
            params = {
                "hotel_id": "58726a8e5aa124394eb7dae4",
                "tax_id" : tax.id,
                "status" : 3
            }
            ManageTaxes.deleteTax(params, function () {
                $state.go('.', {}, { reload: 'taxes' });
            });
        };

        $scope.editTax = function(id){
            $state.go("create-tax", {"id" : id});
        };

    });
