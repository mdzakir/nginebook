angular.module("upload-images.controllers", [
        "upload-images.module"
    ])
    .controller('UploadController', function($state, $http,$scope) {
        $scope.title = "Upload";
        
        $scope.saveImage = function(apiEndPoint){
            $http.post('http:localhost/upload/list/', $scope.docfile)
                .then(function () {
                    callback();
                });
        }
    });
