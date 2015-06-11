/* global angular */

(function (angular) {

  'use strict';

  angular.module('myApp')

  .directive('prettyLoader', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/directives/prettyLoader.html',
      scope: {
        loaded: '@loaded'
      },
      replace: true,
      controller: ['$scope', '$timeout',
      function prettyLoaderController ($scope, $timeout) {

        $scope.loading = true;

        if ($scope.loaded) {
          $timeout(function () {
            $scope.loading = false;
          }, 500);
        }
      }]
    };
  });

})(angular);
