angular.module("promotions.config", [])
.config(function ($stateProvider) {
	$stateProvider
	.state("promotions", {
		url : "/promotions",
		controller : "DealsPromotionsController",
		templateUrl : "app/promotions/templates/promotions.html"
	})	
})