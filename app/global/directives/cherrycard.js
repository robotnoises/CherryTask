(function (angular) {

  'use strict';

  angular.module('cherry')

  .directive('cherryCard', function() {
    return {
      restrict: 'E',
	  replace: true,
	  scope: {
		card: '='  
	  },
      templateUrl: 'templates/directives/cherry-card.html',
      controller: ['$scope', '$location', '$timeout', '$q', '$routeParams', 'apiService',
      function cherryCardController ($scope, $location, $timeout, $q, $routeParams, api) {
        
        $scope.menuShowing = false;
        
        $scope.show = function () {
          $location.path($scope.card.type + 's/' + $scope.card.id);
        };
        
        $scope.toggleShowMenu = function (force) {
          $scope.menuShowing = force || !$scope.menuShowing;
        };
                      
      }]
    };
  });

})(angular);