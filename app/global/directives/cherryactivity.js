(function (angular) {

  'use strict';

  angular.module('cherry')

  .directive('cherryActivity', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'templates/directives/cherry-activity.html',
      controller: ['$scope', '$routeParams', 'fbutil', 'apiService', 'cherryAuth',
        function activityController ($scope, $routeParams, fbutil, api, cherryAuth) {
        
        var taskId = $routeParams.id;
        var loc = 'tasks/' + taskId + '/activites';
        
        // Enums
        
        var TYPE = Object.freeze({
          COMMENT: 0,
          EVENT: 1,
          PROGRESS: 2,
          MOOD: 3
        });
        
        // Private
        
        function formatNumber(input) {
          if (typeof input === 'string') {
            return parseInt(input, 10);
          } else {
            return input;
          }
        }
        
        // Form stuff
        
        $scope.activityType = TYPE.COMMENT; // What type of things are we posting?
        $scope.activityValue = 0;           // Does it have a (number) value? (mood, progress)
        $scope.currentActivity = TYPE.COMMENT;
        
        api.list(loc, 10, function (activities) {
          $scope.activities = activities;
        });
        
        $scope.addActivity = function(activity) {
          if (activity) {
            cherryAuth.get().then(function (auth) {
              $scope.activities.$add({
                user: '@' + auth.name,  // Todo: need to record the uid and not the name, since names are aliases and can change
                text: activity,
                type: parseInt($scope.activityType, 10), 
                value: $scope.activityValue,
                timeStamp: new Date().getTime()
              });
            });
          }
        };
        
        $scope.badgeStyle = function(aType) {
          
          aType = formatNumber(aType);
          
          if (aType === TYPE.COMMENT) {
            return 'comment';
          } else if (aType === TYPE.EVENT) {
            return 'event';
          } else if (aType === TYPE.PROGRESS) {
            return 'progress';
          } else if (aType === TYPE.MOOD) {
            return 'status';
          } else {
            return 'cherry;'
          }
        }
        
        $scope.showSelections = false;
        
        $scope.toggleSelected = function (aType) {
          $scope.currentActivity = aType;
        }
        
      }]
    };
  });

})(angular);
