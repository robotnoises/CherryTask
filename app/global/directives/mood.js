(function (angular) {

  'use strict';

  angular.module('myApp')

  .directive('moodIcon', function() {
    return {
      restrict: 'E',
	  replace: true,
	  scope: {
		card: '='  
	  },
      templateUrl: 'templates/directives/mood.html',
      controller: ['$scope', '$location', '$timeout', '$q', '$routeParams', 'apiService',
      function moodController ($scope, $location, $timeout, $q, $routeParams, api) {
        
        $scope.getMood = function () {
          if (typeof $scope.card.mood !== 'undefined' && $scope.card.mood !== 50) {
            var mood = $scope.card.mood;
            if (mood > 50 && mood < 75) {
              return 'kinda-happy';
            } else if (mood >= 75 && mood < 100) {
              return 'happy';
            } else if (mood === 100) {
              return 'super-happy';
            } else if (mood < 50 && mood > 25) {
              return 'kinda-sad';
            } else if (mood <= 25 && mood > 0) {
              return 'sad';
            } else if (mood === 0) {
              return 'super-sad';
            }
          } else {
            return '';
          }
        };
           
      }]
    };
  });

})(angular);