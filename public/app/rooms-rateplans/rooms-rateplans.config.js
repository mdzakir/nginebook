angular.module("rooms-rateplans.config", [])
.config(function ($stateProvider) {
	$stateProvider
	.state("rooms-rateplans", {
		url : "/rooms-rateplans",
		templateUrl : "app/rooms-rateplans/templates/rooms-rateplans.html",
		resolve: {
			amenities : function(ManageRooms){
				return ManageRooms.getRoomAmenities();
			}
		},
		controller : "RoomsRateplansController"
	})	
})