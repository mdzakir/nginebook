angular.module("create.addOns.controllers", [
        "addOns.module"
    ])
    .controller('CreateAddOnsController', function($state, $scope, $http, $stateParams, ManageAddOns,viewAddOns) {
        
        $scope.addOns =  {};

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

        
        $scope.showAddRoomForm = false;
        $scope.addAddOnsForm = function(){
            $state.go('create-addOns');
        };

        $scope.saveAddOns = function(){
            var params = {
                "hotel_id":"58726a8e5aa124394eb7dae4",
                "name":$scope.addOns.name,
                "description":$scope.addOns.description,
                "valid_from":moment($scope.addOns.validity_start).format("YYYY-MM-DD"),
                "valid_to":moment($scope.addOns.validity_end).format("YYYY-MM-DD"),
                "days":[true,true,true,true,true,true,true],
                "cut_off":Number($scope.addOns.cut_off),
                "charge_type":Number($scope.addOns.chargeType),
                "is_mandate":Boolean($scope.addOns.mandate),
                "image":""
            };

            ManageAddOns.save(params, true, function () {
                $state.go('base.addOns');
            });
        };
        

    });
