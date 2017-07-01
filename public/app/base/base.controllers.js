angular.module("base.controllers", [
        "base.module"
    ])
    .controller('BaseController', ['$scope', '$rootScope', function($scope, $rootScope) {

       $scope.hotels = [{
       	id:1,
       	name: "Hotel Krishna"
       },{
       	id:2,
       	name: "Ganga Residency"
       },{
       	id:3,
       	name: "Paradise Hotel"
       },{
       	id:4,
       	name: "Taj Vivanta"
       }];
       console.log($scope.hotels);

       $scope.selectedHotel = $scope.hotels[0];

    }]);
