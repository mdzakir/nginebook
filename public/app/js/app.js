angular.module("productApp", [
	"ui.router",
	"cart.module",
	"app.config",
	"app.controllers",
	"about.module",
	"home.module",
	"inventory.module",
	"product.module",
	"ngResource"
])

.constant('DEBUG', true)

.run(function($rootScope){
    $rootScope.appTitle = "Booking Engine";
    $rootScope.title = "Booking Engine Admin";
})

.run(function(DEBUG){
})

.run(function ($rootScope) {
	$rootScope.$on("pageTitleChanged", function($event, title){
		$rootScope.pageTitle = title;
	})
});