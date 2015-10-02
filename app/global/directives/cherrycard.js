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
        
        var loc = $scope.card.type + 's/' + $scope.card.id;
        
        $scope.menuShowing = false;
        $scope.removeConfirming = false;
        
        $scope.show = function () {
          // + s for task(s) or project(s)
          $location.path(loc);
        };
        
        $scope.toggleShowMenu = function (force) {
          
          $scope.menuShowing = force || !$scope.menuShowing;
          
          if ($scope.removeConfirming) {
            $scope.toggleConfirmRemove(false);  
          }
        };
        
        // Menu Actions
        
        $scope.toggleConfirmRemove = function (force) {
          $scope.removeConfirming = force || !$scope.removeConfirming;
        };
        
        $scope.remove = function () {
          // Todo confirm

          api.remove(loc).then(function(msg) {
            console.log(msg);
          }).catch(function(err) {
            console.error(err);
          });
        };
                      
      }]
    };
  });

})(angular);