angular.module("create.rateplan.controllers", [
        "rateplans.module"
    ])
    .controller('CreateRateplanController', function($state, $scope, $http, $stateParams, ManageRateplans, rateplan, viewRateplans) {

        $scope.title = "Create Rateplan";
        $scope.$emit("pageTitleChanged", "Create Rateplan");

        $scope.rateplan = rateplan[0] || {};

        // Available Rateplans
        var isAddRateplan = _.isEmpty($scope.rateplan);

        if (isAddRateplan) {
            $scope.rateplan.inclusions = [{ name: '' }];
            $scope.rateplan.exclusions = [{ name: '' }];
            $scope.rateplan.allow_modification = "false";
            $scope.rateplan.blackout_dates = [];
            $scope.rateplan.rp_applicable_days = [];
            $scope.showBlackoutFields = false;
        } else {

            $scope.rateplan.rateplan_validity_start = Number(moment($scope.rateplan.rateplan_validity_start).format('x'));
            $scope.rateplan.rateplan_validity_end = Number(moment($scope.rateplan.rateplan_validity_end).format('x'));

        }

        $scope.addInclusion = function() {
            if ($scope.rateplan.inclusions[$scope.rateplan.inclusions.length - 1].name) {
                $scope.inclusionValueError = false;
                $scope.rateplan.inclusions[$scope.rateplan.inclusions.length] = {};
            } else {
                $scope.inclusionValueError = true;
            }

        };

        $scope.addExclusion = function() {
            if ($scope.rateplan.exclusions[$scope.rateplan.exclusions.length - 1].name) {
                $scope.exclusionValueError = false;
                $scope.rateplan.exclusions[$scope.rateplan.exclusions.length] = {};
            } else {
                $scope.exclusionValueError = true;
            }
        };

        if (isAddRateplan) {
            var fromList = [{ id: 1, selected: false }, { id: 2, selected: true }, { id: 3, selected: false }, { id: 4, selected: false }];
            var toList = [{ id: 1, selected: true }, { id: 2, selected: false }, { id: 3, selected: false }, { id: 4, selected: false }];
            var amountType = [{ id: 1, name: 'Percentage', selected: true }, { id: 2, name: 'Fixed', selected: false }];
        }
        if (!isAddRateplan) {
            var fromList = [{ id: 1, selected: false }, { id: 2, selected: true }, { id: 3, selected: false }, { id: 4, selected: false }];
            var toList = [{ id: 1, selected: true }, { id: 2, selected: false }, { id: 3, selected: false }, { id: 4, selected: false }];
            var amountType = [{ id: 1, name: 'Percentage', selected: true }, { id: 2, name: 'Fixed', selected: false }];

        }

        $scope.rateplan.cp = [{ from_checkin: fromList, to_checkin: toList, amount_type: amountType, amount: 0 }];
        $scope.fromSelected = $scope.rateplan.cp[0].from_checkin[1];
        $scope.toSelected = $scope.rateplan.cp[0].to_checkin[0];
        $scope.typeSelected = $scope.rateplan.cp[0].amount_type[0];

        $scope.addCP = function() {
            if ($scope.rateplan.cp[$scope.rateplan.cp.length - 1].amount > 0) {
                $scope.cpError = false;
                $scope.rateplan.cp[$scope.rateplan.cp.length] = { from_checkin: fromList, to_checkin: toList, amount_type: amountType, amount: 0 };
            } else {
                $scope.cpError = true;
            }
        };

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

        $scope.rateplan_validity_start_popup = { opened: false };
        $scope.rateplan_validity_end_popup = { opened: false };
        $scope.rp_blackout_validity_start_popup = { opened: false };
        $scope.rp_blackout_validity_end_popup = { opened: false };

        function uiDay(serverDay) {
            return (serverDay + 6) % 7;
        }

        // Get booking range of dates
        $scope.validityRangeOfDates = function() {

            var start_date = moment($scope.rateplan.rateplan_validity_start).format("YYYY-MM-DD");
            var end_date = moment($scope.rateplan.rateplan_validity_end).format("YYYY-MM-DD");

            var applicableDays = _.map($scope.rateplan.rp_applicable_days, function(b) {
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

            $scope.rateplan.validityBlackouts = _.map(between, function(b) {
                var blackoutDates = {
                    value: moment(b).format("DD-MM-YYYY"),
                    name: moment(b).format("DD MMM YYYY (ddd)")
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
            $scope.rateplan.blackout_dates = [];

        };

        $scope.setMinDate = function() {
            if ($scope.rateplan.rp_blackout_validity_end !== undefined) {
                if ($scope.rateplan.rp_blackout_validity_end < $scope.rateplan.rp_blackout_validity_start) {
                    $scope.rateplan.rp_blackout_validity_end = '';
                }
            }
            $scope.blackoutEndOptions.minDate = angular.copy($scope.rateplan.rp_blackout_validity_start);
            $scope.blackoutEndOptions.initDate = angular.copy($scope.rateplan.rp_blackout_validity_start);

            $scope.open_rp_blackout_validity_start();
        };

        $scope.pushBlackouts = function() {
            if ($scope.rateplan.rp_blackout_validity_start && $scope.rateplan.rp_blackout_validity_end) {
                var blackout_range = {
                    "start": moment($scope.rateplan.rp_blackout_validity_start).format("DD MMM YYYY"),
                    "end": moment($scope.rateplan.rp_blackout_validity_end).format("DD MMM YYYY")
                }
                if (!(_.some($scope.rateplan.blackout_dates, blackout_range))) {
                    $scope.rateplan.blackout_dates.push(blackout_range);
                }
            }
        };

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

        if (!isAddRateplan) {

            $scope.showBlackoutFields = (_.size($scope.rateplan.blackout_dates) > 0) ? true : false;

            $scope.blackoutStartOptions.minDate = angular.copy($scope.rateplan.rateplan_validity_start);
            $scope.blackoutStartOptions.maxDate = angular.copy($scope.rateplan.rateplan_validity_end);

            $scope.blackoutEndOptions.minDate = angular.copy($scope.rateplan.rateplan_validity_start);
            $scope.blackoutEndOptions.maxDate = angular.copy($scope.rateplan.rateplan_validity_end);
        }

        $scope.saveAddRateplan = function() {

            var transform_cp = _.map($scope.rateplan.cp, function(cp) {
                return {
                    from_checkin: _.find(cp.from_checkin, ['selected', true]).id,
                    to_checkin: _.find(cp.to_checkin, ['selected', true]).id,
                    amount_type: _.find(cp.amount_type, ['selected', true]).id,
                    amount: parseInt(cp.amount)
                }
            })

            var params = {
                "hotel_id": "58726a8e5aa124394eb7dae4",
                "rate_id": _.isEmpty($scope.rateplan) ? " " : $scope.rateplan.id,
                "name": $scope.rateplan.name,
                "description": $scope.rateplan.description,
                "inclusions": $scope.rateplan.inclusions,
                "exclusions": $scope.rateplan.exclusions,
                "rateplan_validity_start": moment($scope.rateplan.rateplan_validity_start).format('DD-MM-YYYY'),
                "rateplan_validity_end": moment($scope.rateplan.rateplan_validity_end).format('DD-MM-YYYY'),
                "applicable_days": $scope.rateplan.rp_applicable_days,
                "blackout_dates": $scope.rateplan.blackout_dates,
                "min_adults": $scope.rateplan.min_adults,
                "max_adults": $scope.rateplan.max_adults,
                "min_los": $scope.rateplan.min_los,
                "max_los": $scope.rateplan.max_los,
                "min_rooms": $scope.rateplan.min_no_of_rooms,
                "max_rooms": $scope.rateplan.max_no_of_rooms,
                "allow_modification": $scope.rateplan.allow_modification,
                "cancellation_policy": transform_cp,
                "cut_off_days": $scope.rateplan.cut_off_days,
            };

            ManageRateplans.save(params, isAddRateplan, function() {
                $state.go('rateplans');
            });
        };


    });
