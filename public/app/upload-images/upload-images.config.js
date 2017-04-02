angular.module("upload-images.config", [])
    .config(function($stateProvider) {
        $stateProvider
            .state("base.upload", {
                url: "/upload",
                templateUrl: "app/upload-images/templates/upload-file.html",
                resolve: {
                    hotelId: function() {
                        return '58726a8e5aa124394eb7dae4';
                    }

                },
                controller: "UploadController"
            });
    })
    .factory('UploadFactory', function($http, $q, apiEndPoint) {
        return {
            save: function(params, callback) {
                $http.post(apiEndPoint + '/upload/list/', params)
                    .then(function() {
                        callback();
                    });
            },
        };
    })
    .directive("ngFileModel", [function() {
        return {
            scope: {
                ngFileModel: "="
            },
            link: function(scope, element, attributes) {
                element.bind("change", function(changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function(loadEvent) {
                        scope.$apply(function() {
                            scope.ngFileModel = {
                                lastModified: changeEvent.target.files[0].lastModified,
                                lastModifiedDate: changeEvent.target.files[0].lastModifiedDate,
                                name: changeEvent.target.files[0].name,
                                size: changeEvent.target.files[0].size,
                                type: changeEvent.target.files[0].type,
                                data: loadEvent.target.result
                            };
                        });
                    }
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        }
    }]);
