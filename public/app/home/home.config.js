angular.module("home.config", [])
.config(function ($stateProvider) {
	$stateProvider
	.state("base.home", {
		url : "/home",
		controller : "HomeController",
		templateUrl : "app/home/templates/home.html"
	})
})