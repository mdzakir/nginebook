angular.module("inventory.controllers", [
    "inventory.module"
])

.controller('InventoryController', ['$scope', '$state', 'ManageInventory', 'viewInventory', 'viewRooms', function($scope, $state, ManageInventory, viewInventory, viewRooms) {
    $scope.title = "Inventory";
    $scope.$emit("pageTitleChanged", "Inventory");

    // DATE PICKER

    $scope.inventoryData = viewInventory;

    $scope.rooms = _.clone(viewRooms);
    $scope.room = $scope.rooms[0].id;

    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd MMM yyyy', 'shortDate'];
    $scope.format = $scope.formats[2];
    $scope.altInputFormats = ['M!/d!/yyyy'];


    //Filters Form

    $scope.filter_rooms = _.clone(viewRooms);
    $scope.filter_room = $scope.filter_rooms[0].id;

    $scope.open_filter_start = function() {
        $scope.filter_start_date_popup.opened = true;
    };

    $scope.open_filter_end = function() {
        $scope.filter_end_date_popup.opened = true;
    };

    $scope.filter_start_date_popup = {
        opened: false
    };

    $scope.filter_end_date_popup = {
        opened: false
    };

    //Update Form

    $scope.open_start = function() {
        $scope.start_date_popup.opened = true;
    };

    $scope.open_end = function() {
        $scope.end_date_popup.opened = true;
    };

    $scope.start_date_popup = {
        opened: false
    };

    $scope.end_date_popup = {
        opened: false
    };

    // WEEK ARRAY

    $scope.weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // OFFSET FOR GENERATING DATES
    function setOffset(arr) {
        var newArr = [];
        for (var i = 0; i < arr.length; i += 7) {
            newArr.push(arr.slice(i, i + 7));
        }
        return newArr;
    }

    // GENERATE INVENTORY TABLE

    function generateInventoryTable() {
        var year = ManageInventory.currentYear();
        var month = ManageInventory.currentMonth() - 1;

        $scope.currentMonth = moment(month).format('MMMM');
        $scope.currentYear = year;

        var startDate = moment([year, month]);
        var endDate = moment(startDate).endOf('month');
        var dates = [];
        var weeksetOffset = [];

        var monthStartDate = new Date(startDate);
        var monthStartWeekday = monthStartDate.getDay();
        var monthOffset = (monthStartWeekday + 6) % 7;

        if (monthOffset - 1 < 6) {
            for (var m = monthOffset - 1; m >= 0; m--) {
                weeksetOffset.push('&nbsp;');
            }
        }

        $scope.daysInMonth = [];

        var monthDate = moment().startOf('month');

        _.times(monthDate.daysInMonth(), function(n) {
            $scope.daysInMonth.push({
                date: monthDate.format('DD'),
                fullDate: monthDate.format('YYYY-MM-DD'),
            });
            monthDate.add(1, 'day');
        });

        $scope.invDataFeed = _.merge($scope.daysInMonth, $scope.inventoryData);

        $scope.allDaysOfMonthWeekWise = setOffset(weeksetOffset.concat($scope.invDataFeed));
        $scope.allDaysOfMonth = _.flatten($scope.allDaysOfMonthWeekWise)

    }

    generateInventoryTable();

    $scope.showUpdateInventoryForm = false;
    $scope.showUpdateInventoryFormFn = function(){
    	$scope.showUpdateInventoryForm = true;
    };

    $scope.hideUpdateInventoryFormFn = function(){
    	$scope.showUpdateInventoryForm = false;	
    }

    $scope.roomChange = function(room) {
        $scope.room = room;
    }

	$scope.filterRoomChange = function(filter_room){
		$scope.filter_room = filter_room;
	}

    $scope.updateInventory = function() {
        var params = {
            "hotel_id": "58726a8e5aa124394eb7dae4",
            "room_id": $scope.room,
            "availablity": $scope.availablity,
            "start_date": moment($scope.start_date).format("YYYY-MM-DD"),
            "end_date": moment($scope.end_date).format("YYYY-MM-DD")
        };
        ManageInventory.updateInv(params, function() {
            $state.go('.', {}, { reload: 'inventory' });
        });
    };

}]);
