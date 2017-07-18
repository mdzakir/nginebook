angular.module("rules.controllers", [
        "rules.module"
    ])
    .controller('RulesController', function($state, $scope, ManageRules, viewRules, viewRooms, hotelId) {
        $scope.title = "Rules";
        $scope.$emit("pageTitleChanged", "Rules");

        $scope.hotelId = hotelId;

        // Available Rooms
        $scope.rooms = viewRooms;

        // Available Rules
        $scope.rules = viewRules;

        $scope.deleteRule = function(rule){
            params = {
                "hotel_id": $scope.hotelId,
                "rule_id" : rule.id,
                "status" : 3
            }
            ManageRules.deleteRule(params, function () {
                $state.go('.', {}, { reload: 'base.rules' });
            });
        };

        $scope.editRule = function(id){
            $state.go("base.create-rule", {"id" : id});
        };

    });
