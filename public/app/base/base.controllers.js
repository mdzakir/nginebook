angular.module("base.controllers", [
        "base.module"
    ])
    .controller('BaseController', ['$scope', '$rootScope', 'hotels', 'AppContext', 'User', '$rootScope', '$window' , function($scope, $rootScope, hotels, AppContext, User, $rootScope, $window) {

      console.log('hotels-->', hotels);

      $scope.hotels = hotels;
      $scope.hotelId = User.getHotelID();
      $scope.indexOfSelectedHotel = _.findIndex($scope.hotels, function (o) {
          return o.id == $scope.hotelId;
      });
      $scope.selectedHotel = $scope.hotels[$scope.indexOfSelectedHotel];

      $scope.hotelChanged = function (changedHotelID) {
          updateUserSettings(changedHotelID);
          UIContext.changeHotel(changedHotelID);
          $scope.hotelId = changedHotelID;
          $scope.indexOfSelectedHotel = _.findIndex($scope.hotels, function (o) {
              return o.id == $scope.hotelId;
          });
          $scope.selectedHotel = $scope.hotels[$scope.indexOfSelectedHotel];
          User.setRoomID([1, false]);
          BookingImports.get(changedHotelID).then(function (res) {
              $scope.bookingImports = res.data;
          });
      };

      $scope.logout = function () {
          User.logout();
      };


       $scope.selectedHotel = $scope.hotels[0];

    }]);
