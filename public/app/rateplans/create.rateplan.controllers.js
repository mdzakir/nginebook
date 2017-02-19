angular.module("create.rateplan.controllers", [
        "rateplans.module"
    ])
    .controller('CreateRateplanController', function($state, $scope, $http, $stateParams, ManageRateplans, rateplan, viewRateplans) {
        
        console.log(rateplan);
        $scope.rateplan = rateplan;

        // AVAILABLE RATEPLANS
        $scope.rateplans = viewRateplans;
        var isAddRateplan = _.isEmpty($scope.rateplans);

        if(isAddRateplan){

        }else{
            $scope.showAddRateplanForm = true;
        }
        // SHOW ADD RATEPLAN FORM
        $scope.showAddRateplanForm = false;
        $scope.addRateplanForm = function(){
            $state.go('create-rateplan');
        };

        $scope.rateplan.images = [{name:'', img_url : '', order:''}];
        $scope.addImage = function(){
            $scope.rateplan.images[$scope.rateplan.images.length] = {};
        };
        $scope.removeImage = function(index){
            $scope.rateplan.images.splice( index, 1 );        
        };
        $scope.rateplan.isSmoking = "false";

        $scope.saveAddRateplan = function(){
            var params = {
                "hotel_id": "58726a8e5aa124394eb7dae4",
                "name": $scope.rateplan.name,
                "description": $scope.rateplan.description,
                "type" : $scope.rateplan.type,
                "status" : 1,
                "is_smoking" : $scope.rateplan.isSmoking,
                "max_adult" : $scope.rateplan.max_adult,
                "images" : $scope.rateplan.images
            };

            ManageRateplans.save(params, isAdRateplan, function () {
                $state.go('rateplans');
            });
        };
        

    });
