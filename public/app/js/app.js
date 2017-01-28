angular.module("productApp", [
	"ui.router",
	"ui.bootstrap",
	"cart.module",
	"app.config",
	"app.controllers",
	"home.module",
	"bookings.module",
	"rooms.module",
	"rateplans.module",
	"inventory.module",
	"pricing.module",
	"deals.module",
	"promotions.module",
	"manual-booking.module",
	"product.module",
	"about.module",
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