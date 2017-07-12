angular.module("login.controllers", [
    "login.module"
])

.controller('LoginController', function($scope, $state,$http, User, $rootScope,RegisterUser) {
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
            first_name : $scope.registrationDetails.firstName,
            last_name : $scope.registrationDetails.lastName,
            user_type : $scope.registrationDetails.typeOfUser,
            email : $scope.registrationDetails.emailId,
            phone : $scope.registrationDetails.mobile,
            password: $scope.registrationDetails.password
        };

        RegisterUser.register(regParams, function() {
            $state.go('.', {}, { reload: 'login' });
        });
    };

});
