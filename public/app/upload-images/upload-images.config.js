angular.module("upload-images.config", [])
    .config(function($stateProvider) {
        $stateProvider
            .state("base.upload", {
                url: "/upload",
                templateUrl: "app/upload-images/templates/upload-file.html",
                resolve: {
                    hotelId: function() {
                        return '58726a8e5aa124394eb7dae4';
                    },
                    viewRooms: function(UploadFactory) {
                        return UploadFactory.getRooms();
                    },

                },
                controller: "UploadController"
            });
    })
    .factory('UploadFactory', function($http, $q, apiEndPoint) {
        return {
        	getRooms: function() {
                var deferred = $q.defer();
                var viewrooms = deferred.promise;
                $http.get(apiEndPoint + '/room/view?hotel_id=58726a8e5aa124394eb7dae4&status=1').then(function(response) {
                    var viewrooms = response.data;
                    deferred.resolve(viewrooms);
                }, function(error) {
                    viewrooms = null;
                    deferred.reject(error);
                });
                return viewrooms;
            },
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
