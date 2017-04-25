angular.module("addOns.config", [])
.config(function ($stateProvider) {
	$stateProvider
	.state("base.addOns", {
		url : "/addOns",
		templateUrl : "app/addOns/templates/addOns.html",
		resolve: {
			hotelId: function() {
                return '58726a8e5aa124394eb7dae4';
            },
			viewAddOns : function(ManageRooms){
				return ManageRooms.getRooms();
			},
		},
		controller : "RoomsController"
	})
    .state('base.create-addOns', {
        url: '/addOns/:id',
        templateUrl: 'app/addOns/templates/create-addOns.html',
        resolve: {
            hotelId: function() {
                return '58726a8e5aa124394eb7dae4';
            },
            viewRooms : function(ManageAddOns){
                return ManageAddOns.getAddOns();
            }
        },
        controller: 'CreateRoomController'
    });
})
.factory('ManageAddOns', function ($http, $q, apiEndPoint) {
    return {
        getAddOns: function(){
            var deferred = $q.defer();
            var viewaddons = deferred.promise;
            $http.get(apiEndPoint + '/addOns/view?hotel_id=58726a8e5aa124394eb7dae4').then(function(response) {
                var viewaddons = response.data;
                deferred.resolve(viewaddons);
            }, function(error) {
                viewaddons = null;
                deferred.reject(error);
            });
            return viewaddons;
        },
        save: function (params, isAdd, callback) {
            var post_url = isAdd ? apiEndPoint + '/addOns/create/' : apiEndPoint + '/addOns/edit/' ;
            $http.post(post_url, angular.toJson(params, true))
                .then(function () {
                    callback();
                });
        }
    };
})