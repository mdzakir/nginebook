angular.module("create.addOns.controllers", [
        "addOns.module"
    ])
    .controller('CreateAddOnsController', function($state, $scope, $http, $stateParams, ManageAddOns,viewAddOns) {
        
        $scope.addOns =  {};

        // AVAILABLE ROOMS
        var isAddAddOns = _.isEmpty($scope.addOns);

        if(isAddAddOns){
           
        }else{
            $scope.showAddRoomForm = true;
        }
        // SHOW ADD ROOM FORM
        $scope.showAddRoomForm = false;
        $scope.addAddOnsForm = function(){
            $state.go('create-addOns');
        };

        $scope.saveAddRoom = function(){
            var params = {
                
            };

            ManageAddOns.save(params, isAddAddOns, function () {
                $state.go('base.rooms');
            });
        };
        

    });
