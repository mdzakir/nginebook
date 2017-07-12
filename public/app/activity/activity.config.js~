angular.module("activity.config", [])
.config(function ($stateProvider) {
	$stateProvider
	.state("base.activity", {
		url : "/activity",
		templateUrl : "app/activity/templates/activity.html",
		resolve: {
			hotelId: function() {
                return '58726a8e5aa124394eb7dae4';
            },
			viewActivity : function(ManageActivity){
				return ManageActivity.getActivity();
			},
		},
		controller : "ActivityController",
	});
})
.factory('ManageActivity', function ($http, $q, apiEndPoint) {
    return {
        getActivity : function(){
        	var params = {
            	'hotel_id':'5905c8cc5aa12456a8453ad1',
            	'activity':4,
            	'start_date':'2017-01-01',
            	'end_date':'2017-08-01'
            };
            var deferred = $q.defer();
            var viewActivity = deferred.promise;
            var post_url = apiEndPoint + '/activity/view/';
            $http.post(post_url,params).then(function(response) {
                var viewActivity = response.data;
                deferred.resolve(viewActivity);
            }, function(error) {
                viewActivity = [];
                deferred.reject(error);
            });
            return viewActivity;
        }
    };
})
