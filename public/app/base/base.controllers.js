angular.module("base.controllers", [
        "base.module"
    ])
    .controller('BaseController', ['$scope', '$rootScope', function($scope, $rootScope) {

        console.log('BaseController');
    }]);
