angular.module("rooms-rateplans.config", [])
.config(function ($stateProvider) {
	$stateProvider
	.state("rooms-rateplans", {
		url : "/rooms-rateplans",
		controller : "RoomsRateplansController",
		templateUrl : "app/rooms-rateplans/templates/rooms-rateplans.html"
	})	
})