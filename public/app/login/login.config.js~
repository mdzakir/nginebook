angular.module("login.config", [])
    .config(function($stateProvider) {
        $stateProvider
            .state("login", {
                url: "/login",
                templateUrl: "app/login/templates/login.html",
                resolve: {

                },
                controller: "LoginController",
            });
    })
    .factory('RegisterUser', function($http, $q, apiEndPoint) {
	return {
	    register: function(params, callback) {
	        var post_url = apiEndPoint + '/user/createuser';
	        $http.post(post_url, angular.toJson(params, true))
	            .then(function() {
	                callback();
	            });
	    },
	};

    });
