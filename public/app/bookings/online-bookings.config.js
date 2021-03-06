angular.module("online-bookings.config", [])
.config(function ($stateProvider) {
	$stateProvider
	.state("base.online-bookings", {
		url : "/online-bookings",
		templateUrl : "app/bookings/templates/online-bookings.html",
		resolve: {
			hotelId: function() {
                return '58726a8e5aa124394eb7dae4';
            },
			viewBooking : function(ManageBooking){
				return ManageBooking.getBooking();
			},
		},
		controller : "OnlineBookingsController",
	});
})
.factory('ManageBooking', function ($http, $q, apiEndPoint) {
    return {
        getBooking : function(){
        	var params = {
            	'hotel_id':'58726a8e5aa124394eb7dae4',
            	'status':1,
            	'start_date':'2017-01-01',
            	'end_date':'2017-03-01'
            };
            var deferred = $q.defer();
            var viewBookings = deferred.promise;
            var post_url = apiEndPoint + '/booking/bookings/';
            $http.post(post_url,params).then(function(response) {
                var viewBookings = response.data;
                deferred.resolve(viewBookings);
            }, function(error) {
                viewBookings = [];
                deferred.reject(error);
            });
            return viewBookings;
        }
    };
})