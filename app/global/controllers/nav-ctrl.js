(function (angular, ModalEffects) {

  'use strict';

  angular.module('cherry.global')

  .controller('navController', ['$scope', '$location', 'breadcrumbService',
    function ($scope, $location, breadcrumbService) {
      
      var getLocation = function () {
        var path = $location.path().split('/');
        return path.filter(function (e) { return e; })[0];
      };
      
      $scope.slideoutShowing = false;
      $scope.menuShowing = false;
      $scope.notificationsShowing = false;
      $scope.breadcrumbs = breadcrumbService.breadcrumbs;
      
      $scope.toggleMenu = function (force) {
        $scope.menuShowing = force || !$scope.menuShowing;
      };
      
      $scope.toggleNotifications = function (force) {
        $scope.notificationsShowing = force || !$scope.notificationsShowing;
      };
      
      $scope.toggleSlideout = function (force) {
        // TODO: get data for nav menu
        $scope.slideoutShowing = force || !$scope.slideoutShowing;
      };
      
      $scope.$on('$routeChangeSuccess', function (e) {
        breadcrumbService.add(getLocation());
        new ModalEffects();
      });
            
    }]);

})(angular, window.ModalEffects);