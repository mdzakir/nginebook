angular.module("rateplans.config", [])
.config(function ($stateProvider) {
	$stateProvider
	.state("rateplans", {
		url : "/rateplans",
		templateUrl : "app/rateplans/templates/rateplans.html",
		resolve: {
		},
		controller : "RateplansController"
	})	
})