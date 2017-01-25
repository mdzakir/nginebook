angular.module("deals.config", [])
.config(function ($stateProvider) {
	$stateProvider
	.state("deals", {
		url : "/deals",
		controller : "DealsPromotionsController",
		templateUrl : "app/deals/templates/deals.html"
	})	
})