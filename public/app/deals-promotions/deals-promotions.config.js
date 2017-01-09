angular.module("deals-promotions.config", [])
.config(function ($stateProvider) {
	$stateProvider
	.state("deals-promotions", {
		url : "/deals-promotions",
		controller : "DealsPromotionsController",
		templateUrl : "app/deals-promotions/templates/deals-promotions.html"
	})	
})