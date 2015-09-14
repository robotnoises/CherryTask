(function (angular) {

  'use strict';

  angular.module('cherry')

  .directive('cherryActivity', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'templates/directives/cherry-activity.html',
      controller: ['$scope', '$routeParams', '$timeout', 'fbutil', 'apiService', 'activityService',
        function activityController ($scope, $routeParams, $timeout, fbutil, api, activity) {
        
        var taskId = $routeParams.id;
        var loc = 'tasks/' + taskId + '/activites';
        
        // Constants
        
        var placeholder_comment = 'Say something...';
        var placeholder_status = 'How are things going?';
        
        // Enums
        
        var TYPE = Object.freeze({
          COMMENT: 0,
          EVENT: 1,
          PROGRESS: 2,
          MOOD: 3
        });
        
        // Scope
        
        $scope.activityType = TYPE.COMMENT;           // What type of things are we posting?
        $scope.activityValue = 0;                     // Does it have a (number) value? (mood, progress)
        $scope.placeholderText = placeholder_comment; // Display an appropriate placeholder
        $scope.transitioning = false;                 // Flag to enable/disable hover on badge selector                
        $scope.showSelections = false;                // Flag to show/hide badge selections
        
        // Private
        
        function formatNumber(input) {
          if (typeof input === 'string') {
            return parseInt(input, 10);
          } else {
            return input;
          }
        }
        
        function setPlaceholder(aType) {
          if (aType === TYPE.EVENT || aType === TYPE.PROGRESS) {
            return '';
          } else if (aType === TYPE.COMMENT) {
            return placeholder_comment;
          } else if (aType === TYPE.MOOD) {
            return placeholder_status;
          } else {
            return '';
          }
        }
        
        // Get all the activities
        
        api.list(loc, 10, function (activities) {
          $scope.activities = activities;
        });
        
        $scope.doTransition = function (force) {
          $scope.transitioning = force || !$scope.transitioning;
        };
        
        $scope.addActivity = function(text) {
          activity.make(text, $scope.activityType, $scope.activityValue).then(function (activity) {
            $scope.activities.$add(activity);  
          })
          .catch(function (err) {
            // Todo: log this
          });          
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
        
        $scope.toggleSelected = function (aType) {
          $scope.doTransition();
          $scope.activityType = aType;
          $scope.placeholderText = setPlaceholder(aType);
        }
        
      }]
    };
  });

})(angular);
