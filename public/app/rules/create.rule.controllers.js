angular.module("create.rule.controllers", [
        "rules.module"
    ])
    .controller('CreateRuleController', function($state, $scope, $http, $stateParams, ManageRooms, rule, viewRooms) {
        
        $scope.title = "Create Rule";
        $scope.$emit("pageTitleChanged", "Create Rule");

        $scope.rule = rule[0] || {};
        $scope.rule.rooms = viewRooms;

        $scope.changeOccSlabType = function (type) {
            if (type != null) {
                if (type == 'Fixed') {
                    $scope.partitionPriceMinLength = 2;
                    $scope.partitionPriceMaxLength = 6;
                    $scope.partitionPriceMinValue = 0;
                    $scope.partitionPriceMaxValue = 1000000
                }
                if (type == 'Percentage') {
                    $scope.partitionPriceMinLength = 1;
                    $scope.partitionPriceMaxLength = 2;
                    $scope.partitionPriceMinValue = 0;
                    $scope.partitionPriceMaxValue = 99;
                }
            }
        };


        // Available Rules
        var isAddRule = _.isEmpty($scope.rule);

        if(isAddRule){
            $scope.rule.partition_type = 'Percentage';
            $scope.changeOccSlabType($scope.rule.partition_type);
        }else{

        }

        // DATE PICKER

        function dateOptions() {
            return {
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1
            }
        }

        $scope.validityStartOptions = dateOptions();
        $scope.validityEndOptions = dateOptions();

        $scope.open_rule_validity_start = function() {
            $scope.rule_start_popup.opened = true;
        };

        $scope.open_rule_validity_end = function() {
            $scope.rule_end_popup.opened = true;
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd MMM yyyy', 'shortDate'];
        $scope.format = $scope.formats[2];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.rule_start_popup = { opened: false };
        $scope.rule_end_popup = { opened: false };

        function uiDay(serverDay) {
            return (serverDay + 6) % 7;
        }

        $scope.setMinDate = function() {
            if ($scope.rule.end_date !== undefined) {
                if ($scope.rule.end_date < $scope.rule.start_date) {
                    $scope.rule.end_date = '';
                }
            }
            $scope.validityEndOptions.minDate = angular.copy($scope.rule.start_date);
            $scope.validityEndOptions.initDate = angular.copy($scope.rule.start_date);

            $scope.open_rule_validity_end();
        };
        // End Datepicker

        // Days of Week
        $scope.rule.applicable_days = [{
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

        

        $scope.saveAddRule = function(){
            var params = {
                "room_id": _.isEmpty($scope.rule) ? " " : $scope.rule.id,
                "hotel_id": "58726a8e5aa124394eb7dae4",
                "name": $scope.rule.name,
                "start_date" : $scope.rule.start_date,
                "end_date" : $scope.rule.end_date,
                "status" : 1,
            };

            ManageRules.save(params, isAddRule, function () {
                $state.go('base.rules');
            });
        };
        

    });
