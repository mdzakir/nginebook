angular.module("productApp", [
	"ui.router",
	"ui.bootstrap",
	"cart.module",
	"app.config",
	"app.controllers",
	"about.module",
	"home.module",
	"rooms-rateplans.module",
	"inventory.module",
	"pricing.module",
	"bookings.module",
	"product.module",
	"ngResource"
])

.constant('DEBUG', true)

.run(function($rootScope){
    $rootScope.appTitle = "Admin";
    $rootScope.title = "Admin";
})

.run(function(DEBUG){
})

.run(function ($rootScope) {
	$rootScope.$on("pageTitleChanged", function($event, title){
		$rootScope.pageTitle = title;
	})
});