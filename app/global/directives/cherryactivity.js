(function (angular) {

  'use strict';

  angular.module('cherry')

  .directive('cherryActivity', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        task: '='
      },
      templateUrl: 'templates/directives/cherry-activity.html',
      controller: ['$scope', '$routeParams', '$timeout', 'fbutil', 'apiService', 'activityService',
        function activityController ($scope, $routeParams, $timeout, fbutil, api, activity) {
        
        var taskId = $routeParams.id;
        var loc = 'tasks/' + taskId + '/activites';
        var init = false;
        
        // Constants
        
        var placeholder_comment = 'Say something...';
        var placeholder_status = 'How are things going?';
        
        // Enums
        
        var TYPE = Object.freeze({
          COMMENT: 0,
          EVENT: 1,
          PROGRESS: 2,
          MOOD: 3,
          MEDIA: 4
        });
        
        // Directive scope
        
        $scope.activityType = TYPE.COMMENT;             // What type of thing are we posting?
        $scope.placeholderText = placeholder_comment;   // Display an appropriate placeholder
        $scope.transitioning = false;                   // Flag to enable/disable hover on badge selector                
        $scope.showSelections = false;                  // Flag to show/hide badge selections
        $scope.activityProgress = 0;                    // Activity feed progress
        $scope.activityMood = 0;                        // Activity feed mood
        
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
        
        api.list(loc, 10).then(function (activities) {
          $scope.activities = activities;
        });
        
        $scope.doTransition = function (force) {
          $scope.transitioning = force || !$scope.transitioning;
        };
        
        $scope.addActivity = function(text, value) {
          
          var taskPropertyForValue = 'progress';
          
          if ($scope.activityType === TYPE.PROGRESS) {
            // Handle setting the text for progress changes.
            text = 'Changed progress from ' + $scope.task.progress + ' to ' + $scope.activityProgress;
          } else if ($scope.activityType === TYPE.MOOD) {
            // Handle setting the text for status/mood changes.
            taskPropertyForValue = 'mood';
          }
          
          activity.make(text, $scope.activityType, value).then(function (activity) {
            return $scope.activities.$add(activity);  
          })
          .then(function () {
            // Todo: potential race condition with parent task scope loading
            if (value && $scope.task[taskPropertyForValue] !== value) {
              $scope.task[taskPropertyForValue] = value;
              return $scope.task.$save();
            } else {
              return;
            }
          })
          .catch(function (err) {
            // Todo: log this
            console.error(err);
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
          } else if(aType === TYPE.MEDIA) {
            return 'media';
          } else {
            return 'cherry;'
          }
        }
        
        $scope.toggleSelected = function (aType) {
          $scope.doTransition();
          $scope.activityType = aType;
          $scope.placeholderText = setPlaceholder(aType);
        }
        
        // Init
        
        $scope.$watch('task', function (t) {
          // $scope.task alive?
          if (t && !init) {
            // Nice... ok, has the FirebaseObject loaded?
            t.$loaded(function (snapshot) {
              // Awesome!
              init = true;
              // Get stuff
              $scope.activityProgress = snapshot.progress;
              $scope.activityMood = snapshot.mood;
            });
          }
        });
        
      }]
    };
  });

})(angular);
