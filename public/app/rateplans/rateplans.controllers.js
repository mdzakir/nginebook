angular.module("rateplans.controllers", [
        "rateplans.module"
    ])
    .controller('RateplansController', function($scope, $state, ManageRateplans,viewRateplans) {
        $scope.title = "Manage Rateplans";
        $scope.$emit("pageTitleChanged", "Manage Rateplans");

        $scope.rateplans = viewRateplans;
        // AVAILABLE RATEPLANS
        var isAddRateplans = _.isEmpty($scope.rateplans);

        

        // ADD ROOM
        $scope.saveAddRateplan = function(){
            var params = {
                name : $scope.room.name,
                desc : $scope.room.desc,
                images : $scope.room.images,
                type : $scope.room.type,
                min_adult : $scope.room.min_adult,
                max_adult : $scope.room.max_adult,
                amenities : $scope.room.amenities
            };

            ManageRateplans.save(params, isAddRateplans, function () {
                $state.go('rooms-rateplans');
            });
        };
        
    });
