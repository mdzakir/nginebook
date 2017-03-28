angular.module("login.controllers", [
    "login.module"
])

.controller('LoginController', function($scope, $http, User) {
    $scope.title = "Login";
    $scope.$emit("pageTitleChanged", "Login");

    $scope.loginSubmit = function() {
        User.login($scope.email_id, $scope.password).then(function() {
            if (User.getToken('auth-token') == 'invalid') {
                $scope.invalidLogin = true;
            } else {
                $scope.invalidLogin = false;
            }

        });
    };

});
