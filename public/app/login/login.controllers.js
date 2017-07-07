angular.module("login.controllers", [
    "login.module"
])

.controller('LoginController', function($scope, $http, User, $rootScope) {
    $scope.title = "Login";
    $scope.$emit("pageTitleChanged", "Login");

    $scope.loginForm = true;

    $scope.loginOrRegistration = function(form){
        if(form == "registration") {
            $scope.loginForm = false;
            $scope.registrationForm = true;
        }
        if(form == "login") {
            $scope.registrationForm = false;
            $scope.loginForm = true;
        }
    };

    $scope.loginDetails = {
        email_id : '',
        password: '',
        rememberMe: ''
    };

    $scope.registrationDetails = {
        firstName : '',
        lastName : '',
        typeOfUser : '',
        emailId : '',
        mobile : '',
        password: '',
        confirmPassword: ''
    }
    

    $scope.loginSubmit = function() {
        User.login($scope.loginDetails.email_id, $scope.loginDetails.password).then(function() {
            if (User.getToken('auth-token') == 'invalid') {
                $scope.invalidLogin = true;
            } else {
                $scope.invalidLogin = false;
            }
        });
    };

    $scope.registrationSubmit = function() {

        var regParams = {
            firstName : $scope.registrationDetails.firstName,
            lastName : $scope.registrationDetails.lastName,
            typeOfUser : $scope.registrationDetails.typeOfUser,
            emailId : $scope.registrationDetails.emailId,
            mobile : $scope.registrationDetails.mobile,
            password: $scope.registrationDetails.password,
            confirmPassword: $scope.registrationDetails.confirmPassword
        };

        // User.registration(params).then(function() {
        //     if (User.getToken('auth-token') == 'invalid') {
        //         $scope.invalidLogin = true;
        //     } else {
        //         $scope.invalidLogin = false;
        //     }
        // });
    };

});
