angular.module("base.config", [])
.config(function ($stateProvider) {
	$stateProvider
	.state("base", {
		abstract: true,
		templateUrl : "app/base/templates/base.html",
		controller : "BaseController"
	})
	
})