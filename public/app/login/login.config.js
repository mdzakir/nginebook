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
    .factory('ManageLogin', function($http, $q, apiEndPoint) {
        return {
            save: function(params, callback) {
                var post_url = apiEndPoint + '/auth/login/';
                $http.post(post_url, angular.toJson(params, true))
                    .then(function() {
                        callback();
                    });
            },
        };
    })
