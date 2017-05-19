angular.module("inventory.controllers", [
    "inventory.module"
])

.controller('InventoryController', ['$scope', '$state', 'ManageInventory', 'viewInventory', 'viewRooms', 'hotelId', 'roomId', 
    function($scope, $state, ManageInventory, viewInventory, viewRooms, hotelId, roomId) {
    $scope.title = "Inventory";
    $scope.$emit("pageTitleChanged", "Inventory");

    // DATE PICKER

    $scope.inventoryData = viewInventory;
    console.log(viewInventory);

    _.map($scope.inventoryData, function(data){

    });

    // Calendar Start Date
    $scope.calDateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        //minDate: new Date(),
        startingDay: 1,
        "setDate": new Date(),
        defaultDate : new Date()
    }

    $scope.cal_start_date = new Date(localStorage.startDate) || new Date();

    $scope.open_cal_start = function() {
        $scope.open_cal_start_popup.opened = true;
    };

    $scope.open_cal_start_popup = {
        opened: false
    };

    $scope.viewInventory = function(start_date, end_date){
        _generateInventoryTable(viewInventory);
        console.log(_generateInventoryTable(viewInventory));
    };

    function _dateRange(){
        var start = moment();
        if(localStorage.startDate){
            start = localStorage.startDate;
        }
        var end = moment(start).add(14, 'days');
        localStorage.startDate = start;
        localStorage.endDate = end;
        return localStorage;
    }

    function _generateInventoryTable(inventory){
        var output = {};
        output.roomsList = {};
        output.roomsList.invListData = [];
        var roomDetails = [];
        for(var i=0;i<inventory.length;i++){
            var startDate = localStorage.startDate;
            var endDate = localStorage.endDate;
            var datesList = [];
            var invList = [];
            roomDetails.push({
                "room_id" : inventory[i].room_id,
                "room_name" : inventory[i].room_name
            });

            for(var date = moment(startDate); (date.isBefore(endDate) || date.isSame(endDate)); date.add(1, 'days')) {
                var dateValue = moment(date).format("YYYY-MM-DD");

                datesList.push({
                    "year" : moment(date).format("YYYY"),
                    "month" : moment(date).format("MMM"),
                    "date" : moment(date).format("DD"),
                    "day" : moment(date).format("ddd")
                });
                
                if(inventory[i].inventory_list[dateValue]){
                    invList.push({
                        "available" : inventory[i].inventory_list[dateValue].available,
                        "booked" : inventory[i].inventory_list[dateValue].booked,
                        "blocked" : inventory[i].inventory_list[dateValue].blocked,
                        "date" : dateValue,
                        "room_id" : inventory[i].room_id,
                        "room_name" : inventory[i].room_name
                    })
                } else {
                    invList.push({
                        "available" : "NA",
                        "blocked" : "",
                        "date" : dateValue,
                        "room_id" : inventory[i].room_id,
                        "room_name" : inventory[i].room_name
                    })
                }
            }
            output.dates = datesList;
            output.roomsList.invListData.push(invList);

        }
        output.roomsList.roomData = roomDetails;
        return output;
    }

    $scope.inventoryTable = _generateInventoryTable(viewInventory);

    console.log(_generateInventoryTable(viewInventory));

    $scope.setNewDates = function(new_start_date){
        debugger;
        var start = moment(new_start_date, "YYYY-MM-DD");
        var end = moment(new_start_date, "YYYY-MM-DD").add(14, 'days');
        localStorage.startDate = start;
        localStorage.endDate = end;
        $scope.viewInventory(start.format("YYYY-MM-DD"),end.format("YYYY-MM-DD"));
    }

    $scope.startDateChanged = function(){
        console.log($scope.cal_start_date);
        //$scope.setNewDates($scope.cal_start_date);

        var start = moment($scope.cal_start_date, "YYYY-MM-DD");
        var end = moment($scope.cal_start_date, "YYYY-MM-DD").add(14, 'days');
        localStorage.startDate = start;
        localStorage.endDate = end;

        ManageInventory.getInventory(hotelId, roomId, localStorage).then(function(response){
            $scope.inventoryTable = _generateInventoryTable(response);
        });
    };

    $scope.previousDates = function(){
        var start = moment(localStorage.startDate).add(-14, 'days');
        var end = localStorage.startDate;
        localStorage.startDate = start;
        localStorage.endDate = end;

        $scope.cal_start_date = new Date(localStorage.startDate);

        ManageInventory.getInventory(hotelId, roomId, localStorage).then(function(response){
            $scope.inventoryTable = _generateInventoryTable(response);
        });
    };

    $scope.nextDates = function(){
        var start = moment(localStorage.endDate);
        var end = moment(start).add(14, 'days');
        localStorage.startDate = start;
        localStorage.endDate = end;

        $scope.cal_start_date = new Date(localStorage.startDate);

        ManageInventory.getInventory(hotelId, roomId, localStorage).then(function(response){
            $scope.inventoryTable = _generateInventoryTable(response);
        });
    };

    // Rooms
    $scope.rooms = _.clone(viewRooms);
    $scope.room = $scope.rooms[0].id;

    // Date options for form
    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd MMM yyyy', 'shortDate'];
    $scope.format = $scope.formats[2];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.datesSet = []

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

    //generateInventoryTable();

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

    $scope.updateFormElements = {
        start_date : '',
        end_date : '',
        availability : '',
    }

    $scope.updateInventory = function() {
        var params = {
            "hotel_id": "58726a8e5aa124394eb7dae4",
            "room_id": $scope.room,
            "availability": $scope.updateFormElements.availability,
            "start_date": moment($scope.updateFormElements.start_date).format("YYYY-MM-DD"),
            "end_date": moment($scope.updateFormElements.end_date).format("YYYY-MM-DD"),
            "days":[true,true,true,true,true,true,true]
        };
        ManageInventory.updateInv(params, function() {
            $state.go('.', {}, { reload: 'base.inventory' });
        });
    };

}]);
