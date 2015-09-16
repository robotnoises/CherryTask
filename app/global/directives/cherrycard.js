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
        
        $scope.show = function () {
          $location.path($scope.card.type + 's/' + $scope.card.id);
        };
                      
      }]
    };
  });

})(angular);