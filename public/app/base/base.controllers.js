angular.module("base.controllers", [
        "base.module"
    ])
    .controller('BaseController', ['$scope', function($scope) {
        console.log('BaseController');
    }]);
