angular.module("base.controllers", [
        "base.module"
    ])
    .controller('BaseController', ['$scope', '$rootScope', 'hotels', 'AppContext', 'User', '$rootScope', '$window' , function($scope, $rootScope, hotels, AppContext, User, $rootScope, $window) {

      // Set App Global Values 
      $scope.user_name = User.getUserName();
      $scope.hotels = hotels;
      $scope.hotelId = User.getHotelID();
      debugger;
      console.log(User.getHotelID())
      
      $scope.indexOfSelectedHotel = _.findIndex($scope.hotels, function (o) {
          return o.id == $scope.hotelId;
      });

      $scope.selectedHotel = $scope.hotels[$scope.indexOfSelectedHotel];

      $scope.hotelChanged = function (changedHotelID) {
          AppContext.changeHotel(changedHotelID);
          User.setHotelID(changedHotelID);
          console.log(User.getHotelID())
          $scope.hotelId = changedHotelID;
          $scope.indexOfSelectedHotel = _.findIndex($scope.hotels, function (o) {
              return o.id == $scope.hotelId;
          });
          $scope.selectedHotel = $scope.hotels[$scope.indexOfSelectedHotel];
      };

      $scope.logout = function () {
          User.logout();
      };

    }]);
