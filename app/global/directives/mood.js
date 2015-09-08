(function (angular) {

  'use strict';

  angular.module('cherry')

  .directive('moodIcon', function() {
    return {
      restrict: 'E',
	    replace: true,
	    scope: {
		    mood: '=mood'  
	    },
      templateUrl: 'templates/directives/mood.html',
      controller: ['$scope', '$location', '$timeout', '$q', '$routeParams', 'apiService',
      function moodController ($scope, $location, $timeout, $q, $routeParams, api) {
  
        $scope.getMood = function () {
          if (typeof $scope.mood !== 'undefined' && $scope.mood !== 50) {
            var mood = $scope.mood;
            if (mood > 50 && mood < 75) {
              return 'kinda-happy';
            } else if (mood >= 75 && mood < 100) {
              return 'happy';
            } else if (mood === 100) {
              return 'crazy-happy';
            } else if (mood < 50 && mood > 25) {
              return 'kinda-sad';
            } else if (mood <= 25 && mood > 0) {
              return 'sad';
            } else if (mood === 0) {
              return 'crazy-sad';
            }
          } else {
            return 'stoic';
          }
        };
           
      }]
    };
  });

})(angular);