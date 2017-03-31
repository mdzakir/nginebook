angular.module("upload-images.config", [])
.config(function ($stateProvider) {
	$stateProvider
	.state("upload", {
		url : "/upload",
		templateUrl : "app/upload-images/templates/upload-file.html",
		resolve: {
			hotelId: function() {
                return '58726a8e5aa124394eb7dae4';
            }
			
		},
		controller : "UploadController"
	});
})
