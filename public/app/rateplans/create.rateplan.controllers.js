angular.module("create.rateplan.controllers", [
        "rateplans.module"
    ])
    .controller('CreateRateplanController', function($state, $scope, $http, $stateParams, ManageRateplans) {
        
        $scope.rateplan = {};

        // AVAILABLE RATEPLANS
        $scope.rateplans = [];
        var isAddRateplan = _.isEmpty($scope.rateplans);

        if(isAddRateplan){

        }else{
            $scope.showAddRateplanForm = true;
        }

        $scope.rateplan.inclusions = [{name:''}];
        $scope.addInclusion = function(){
            if($scope.rateplan.inclusions[$scope.rateplan.inclusions.length-1].name){
                $scope.inclusionValueError = false;
                $scope.rateplan.inclusions[$scope.rateplan.inclusions.length] = {};    
            }else{
                $scope.inclusionValueError = true;
            }
            
        };

        $scope.rateplan.exclusions = [{name:''}];
        $scope.addExclusion = function(){
            if($scope.rateplan.exclusions[$scope.rateplan.exclusions.length-1].name){
                $scope.exclusionValueError = false;
                $scope.rateplan.exclusions[$scope.rateplan.exclusions.length] = {};    
            }else{
                $scope.exclusionValueError = true;
            }
        };

        $scope.rateplan.allow_modification = "false";

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
        $scope.blackoutStartOptions = dateOptions();
        $scope.blackoutEndOptions = dateOptions();

        $scope.open_rateplan_validity_start = function() {
            $scope.rateplan_validity_start_popup.opened = true;
        };

        $scope.open_rateplan_validity_end = function() {
            $scope.rateplan_validity_end_popup.opened = true;
        };

        $scope.open_rp_blackout_validity_start = function() {
            $scope.rp_blackout_validity_start_popup.opened = true;
        };

        $scope.open_rp_blackout_validity_end = function() {
            $scope.rp_blackout_validity_end_popup.opened = true;
        };


        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd MMM yyyy', 'shortDate'];
        $scope.format = $scope.formats[2];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.rateplan_validity_start_popup = {opened: false};
        $scope.rateplan_validity_end_popup = {opened: false};
        $scope.rp_blackout_validity_start_popup = {opened: false};
        $scope.rp_blackout_validity_end_popup = {opened: false};

        function uiDay(serverDay) {
            return (serverDay + 6) % 7;
        }

        $scope.showBlackoutFields = false;

        // Get booking range of dates
        $scope.validityRangeOfDates = function(){

            var start_date = moment($scope.rateplan.rateplan_validity_start).format("YYYY-MM-DD");
            var end_date = moment($scope.rateplan.rateplan_validity_end).format("YYYY-MM-DD");

            var applicableDays = _.map($scope.rateplan.rp_applicable_days, function(b){
                return b.checked;
            });

            var curr = new Date(start_date),
                between = [];
            while (curr <= new Date(end_date)) {
                if (applicableDays[uiDay(moment(curr).day())]) {
                    between.push(curr.setHours(0, 0, 0, 0));
                }
                curr.setDate(curr.getDate() + 1);
            }
            //return between;

            $scope.rateplan.validityBlackouts = _.map(between, function(b){
                var blackoutDates = {
                    value : moment(b).format("DD-MM-YYYY"),
                    name : moment(b).format("DD MMM YYYY (ddd)")
                }
                return blackoutDates;
            });
            $scope.rateplan.selectedValidityBlackout = $scope.rateplan.validityBlackouts[0].value;

            $scope.showBlackoutFields = true;

            $scope.blackoutStartOptions.minDate = angular.copy($scope.rateplan.rateplan_validity_start);
            $scope.blackoutStartOptions.initDate = angular.copy($scope.rateplan.rateplan_validity_start);
            $scope.blackoutStartOptions.maxDate = angular.copy($scope.rateplan.rateplan_validity_end);

            $scope.blackoutEndOptions.minDate = angular.copy($scope.rateplan.rateplan_validity_start);
            $scope.blackoutEndOptions.maxDate = angular.copy($scope.rateplan.rateplan_validity_end);

            $scope.rateplan.rp_blackout_validity_start = '';
            $scope.rateplan.rp_blackout_validity_end = '';
            $scope.blackoutsRangeList = [];

        };

        $scope.setMinDate = function () {
            if ($scope.rateplan.rp_blackout_validity_end !== undefined) {
                if ($scope.rateplan.rp_blackout_validity_end < $scope.rateplan.rp_blackout_validity_start) {
                    $scope.rateplan.rp_blackout_validity_end = '';
                }
            }
            $scope.blackoutEndOptions.minDate = angular.copy($scope.rateplan.rp_blackout_validity_start);
            $scope.blackoutEndOptions.initDate = angular.copy($scope.rateplan.rp_blackout_validity_start);

            $scope.open_rp_blackout_validity_start();
        };

        $scope.blackoutsRangeList =  [];
        $scope.pushBlackouts = function(){
            if($scope.rateplan.rp_blackout_validity_start && $scope.rateplan.rp_blackout_validity_end){
                var blackout_range = {
                    "start" : moment($scope.rateplan.rp_blackout_validity_start).format("DD MMM YYYY"),
                    "end" : moment($scope.rateplan.rp_blackout_validity_end).format("DD MMM YYYY")
                }
                if(!(_.some($scope.blackoutsRangeList, blackout_range))){
                    $scope.blackoutsRangeList.push(blackout_range);
                }
            }
        }

        $scope.rateplan.rp_applicable_days = [];

        $scope.rateplan.rp_applicable_days = [{
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

        $scope.saveAddRateplan = function(){
            var params = {
                "hotel_id": "58726a8e5aa124394eb7dae4",
                "name": $scope.rateplan.name,
                "description": $scope.rateplan.description,
                "type" : $scope.rateplan.type,
                "status" : 1,
                "is_smoking" : $scope.rateplan.allow_modification,
                "max_adult" : $scope.rateplan.max_adult,
                "images" : $scope.rateplan.images
            };

            ManageRateplans.save(params, isAdRateplan, function () {
                $state.go('rateplans');
            });
        };
        

    });
