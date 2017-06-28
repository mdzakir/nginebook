angular.module("rateplans.controllers", [
        "rateplans.module"
    ])
    .controller('RateplansController', function($scope, $state, ManageRateplans, viewRateplans) {
        $scope.title = "Manage Rateplans";
        $scope.$emit("pageTitleChanged", "Manage Rateplans");

        $scope.rateplans = _.isArray(viewRateplans) ? viewRateplans : [];
        // AVAILABLE RATEPLANS
        var isAddRateplans = _.isEmpty($scope.rateplans);

        $scope.deleteRateplan = function(rateplan) {
            params = {
                "hotel_id": "58726a8e5aa124394eb7dae4",
                "rateplan_id": rateplan.id,
                "status": 3
            }
            ManageRateplans.deleteRateplan(params, function() {
                $state.go('.', {}, { reload: 'rateplans' });
            });
        };

        $scope.editRateplan = function(id) {
            $state.go("base.create-rateplan", { "id": id });
        };

        // ADD ROOM
        $scope.saveAddRateplan = function() {
            var params = {
                name: $scope.room.name,
                desc: $scope.room.desc,
                images: $scope.room.images,
                type: $scope.room.type,
                min_adult: $scope.room.min_adult,
                max_adult: $scope.room.max_adult,
                amenities: $scope.room.amenities
            };

            ManageRateplans.save(params, isAddRateplans, function() {
                $state.go('rooms-rateplans');
            });
        };

    });
