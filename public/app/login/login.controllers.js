angular.module("login.controllers", [
	"login.module"
])

.controller('LoginController', function ($scope, $http,viewBooking) {
	$scope.title = "Login";
	$scope.$emit("pageTitleChanged", "Login");

	$scope.loginSubmit = function(){
		var params = {
			email_id: $scope.email_id,
			password: $scope.password
		};
		
	}

});
















