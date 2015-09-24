(function (angular) {

  'use strict';

  angular.module('cherry.task')

  .controller('taskController', ['$scope', '$routeParams', 'taskService', 'Auth', 'cherryAuth',
    function ($scope, $routeParams, taskService, Auth, cherryAuth) {
      
      var taskId = $routeParams.id;
      
      taskService.get(taskId, function (task) {
        $scope.task = task;
      });
      
      // Private
      
      var isSomething = function (thing) {
        if (typeof thing !== 'undefined') {
          if (thing.length > 0) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      };

      // Users
      
      $scope.assignedUser = {};

      $scope.getAssignedUser = function (uid) {
        cherryAuth.get(uid).then(function (user) {
          $scope.assignedUser = user;
        })
        .catch(function (err) {
          // Todo log this
        });
      }
      
      // Assignee/Watchers
      
      $scope.isAssigned = function () {
        if ($scope.task) {
          return isSomething($scope.task.assignee);  
        } else {
          return false;
        }
      };
      
      $scope.isWatched = function () {
        if ($scope.task) {
          return isSomething($scope.task.watchers);  
        } else {
          return false;
        }
      };
      
      $scope.assign = function (assignee) {
        
        var toBeAssigned = assignee || Auth.$getAuth();
        
        $scope.task.assignee = toBeAssigned.uid;
        
        $scope.task.$save().then(function () {
          // Todo
        })
        .catch(function (err) {
         // Todo log this
        })
        
      };
      
      // Media
      
      var loc = taskId + '/media';
      
      $scope.media = {};
      
      taskService.get(loc, function(mediaItems) {
        $scope.media = mediaItems;
      });
      
    }]);

})(angular);
