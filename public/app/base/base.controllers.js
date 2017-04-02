angular.module("base.controllers", [
        "base.module"
    ])
    .controller('BaseController', ['$scope', '$rootScope', function($scope, $rootScope) {

        $rootScope.$on('userLoggedIn', function() {
            $state.go('base.home');
        });

        console.log('BaseController');
    }]);
