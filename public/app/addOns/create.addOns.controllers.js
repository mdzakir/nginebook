angular.module("create.addOns.controllers", [
        "addOns.module"
    ])
    .controller('CreateAddOnsController', function($state, $scope, $http, $stateParams, ManageAddOns,addOn,viewAddOns) {
        
        $scope.addOns =  addOn || {};
        // AVAILABLE ADDONS
        $scope.addOns.applicable_days = [{
            name: 'Mon',
            checked: true
        }, {
            name: 'Tue',
            checked: true
        }, {
            name: 'Wed',
            checked: true
        }, {
            name: 'Thu',
            checked: true
        }, {
            name: 'Fri',
            checked: true
        }, {
            name: 'Sat',
            checked: true
        }, {
            name: 'Sun',
            checked: true
        }];
        var isAddAddOns = _.isEmpty($scope.addOns);

        $scope.addAddOnsForm = function(){
            $state.go('create-addOns');
        };

        $scope.saveAddOns = function(){
            var params = {
                "addOn_id": isAddAddOns? " " : $scope.addOns.id,
                "hotel_id":"58726a8e5aa124394eb7dae4",
                "name":$scope.addOns.name,
                "description":$scope.addOns.description,
                "valid_from":moment($scope.addOns.validity_start).format("YYYY-MM-DD"),
                "valid_to":moment($scope.addOns.validity_end).format("YYYY-MM-DD"),
                "days":[true,true,true,true,true,true,true],
                "cut_off":Number($scope.addOns.cut_off),
                "charge_type":Number($scope.addOns.charge_type),
                "charge_value":Number($scope.addOns.charge_value),
                "is_mandate":Boolean($scope.addOns.mandate),
                "image":"https://asia-public.foodpanda.com/dynamic/production/in/images/vendors/m5so_sqp.jpg?v=20170408101826"
            };

            ManageAddOns.save(params, isAddAddOns, function () {
                $state.go('base.addOns');
            });
        };
        

    });
