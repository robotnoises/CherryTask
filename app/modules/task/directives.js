(function (angular) {

  'use strict';

  angular.module('myApp.task')

  .directive('card', function() {
    return {
      restrict: 'E',
	  replace: true,
	  scope: {
		project: '='
	  },
      templateUrl: 'templates/directives/card.html',
      controller: ['$scope', '$location', function taskChatController ($scope, $location) {
      
	    $scope.show = function () {
        $location.path('projects/' + $scope.project.id);
      };
	  
      }]
    };
  });

})(angular);
