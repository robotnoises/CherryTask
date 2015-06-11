(function (angular) {

  'use strict';

  angular.module('myApp.global')

  .controller('navController', ['$scope', '$routeParams',
    function ($scope, $routeParams) {

      $scope.showMenu = false;

      $scope.toggleMenu = function () {
        // TODO: get data for nav menu
        $scope.showMenu = !$scope.showMenu;
      };

    }]);

})(angular);
