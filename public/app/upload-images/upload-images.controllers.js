angular.module("upload-images.controllers", [
        "upload-images.module"
    ])
    .controller('UploadController', function($state, $http, $scope, UploadFactory, Upload, $timeout, apiEndPoint, viewRooms) {
        $scope.title = "Upload Files";
        $scope.$emit("pageTitleChanged", "Upload Files");

        $scope.rooms = viewRooms;
        $scope.room = $scope.rooms[0].id;

        $scope.imageCategories = [{
            "id": "Balcony",
            "name": "Balcony"
        }, {
            "id": "Front Desk",
            "name": "Front Desk"
        }];
        $scope.selectedImageCategory = $scope.imageCategories[0].id;

        $scope.uploadPic = function(file) {
            file.upload = Upload.upload({
                url: apiEndPoint + '/upload/list/',
                data: { "docfile": file },
            });

            file.upload.then(function(response) {
                $timeout(function() {
                    file.result = response.data;
                });
            }, function(response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function(evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }

        $scope.saveImage = function(obj) {
            //var params = $scope.docfile;
            var params = {
                "hotel_id": "58726a8e5aa124394eb7dae4",
                "room_id": $scope.room,
                "image_category": $scope.selectedImageCategory,
                "docfile": obj.file_data
            };
            UploadFactory.save(params, function() {
                $state.go('.', {}, { reload: 'base.upload' });
            });
        }

    });
