(function (angular, ModalEffects) {

  'use strict';

  angular.module('cherry.global')

  .controller('breadcrumbController', ['$scope', '$location', 'breadcrumbService',
    function ($scope, $location, breadcrumbService) {
      
      var getLocation = function () {
        var path = $location.path().split('/');
        return path.filter(function (e) { return e; })[0];
      };
      
      $scope.showMenu = false;
      $scope.breadcrumbs = breadcrumbService.breadcrumbs;
            
      $scope.toggleMenu = function () {
        // TODO: get data for nav menu
        $scope.showMenu = !$scope.showMenu;
      };
      
      $scope.$on('$routeChangeSuccess', function (e) {
        breadcrumbService.add(getLocation());
        ModalEffects();
      });
            
    }]);

})(angular, window.ModalEffects);