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
    });
