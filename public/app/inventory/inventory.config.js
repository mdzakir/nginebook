angular.module("inventory.config", [])
.config(function ($stateProvider) {
	$stateProvider
	.state("inventory", {
		url : "/inventory",
		controller : "InventoryController",
		templateUrl : "app/inventory/templates/inventory.html"
	})	
})