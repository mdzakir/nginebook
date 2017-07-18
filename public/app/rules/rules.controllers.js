angular.module("rules.controllers", [
        "rules.module"
    ])
    .controller('RulesController', function($state, $scope, ManageRules, viewRules, viewRooms) {
        $scope.title = "Rules";
        $scope.$emit("pageTitleChanged", "Rules");

        // Available Rooms
        $scope.rooms = viewRooms;

        // Available Rules
        $scope.rules = viewRules;

        $scope.deleteRule = function(rule){
            params = {
                "hotel_id": "58726a8e5aa124394eb7dae4",
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
