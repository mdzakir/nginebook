angular.module("pricing.config", [])
.config(function ($stateProvider) {
	$stateProvider
	.state("pricing", {
		url : "/pricing",
		controller : "PricingController",
		templateUrl : "app/pricing/templates/pricing.html"
	})	
})