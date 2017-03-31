angular.module("base.controllers", [
        "base.module"
    ])
    .controller('BaseController', ['$scope', function($scope, $rootScope) {
    	
        console.log('BaseController');
    }]);
