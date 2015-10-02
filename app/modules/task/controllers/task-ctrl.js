(function (angular, _) {

  'use strict';

  angular.module('cherry.task')

  .controller('taskController', ['$q', '$scope', '$routeParams', 'taskService', 'Auth', 'cherryAuth',
    function ($q, $scope, $routeParams, taskService, Auth, cherryAuth) {
      
      var taskId = $routeParams.id;
      
      taskService.get(taskId, function (task) {
        $scope.task = task;
        
        $scope.task.$loaded(function () {
          
          // Check to see if the current user is watching this task
          isCurrentUserWatching().then(function (result) {
            $scope.currentUserIsWatching = result;
          }).catch(function (err) {
            console.error(err);
          });
          
        });
      });
      
      // Private
      
      function isSomething (thing) {
        if (typeof thing !== 'undefined') {
          if (typeof thing === 'string' && thing.length > 0) {
            return true;
          } else if (typeof thing === 'object') { 
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
      
      // Sync the task state with firebase (We assume you have updated the scope at this point)
      function syncTask () {
        
        if (isSomething($scope.task)) {
          return $scope.task.$save().then(function () {
            isCurrentUserWatching().then(function (result) {
              $scope.currentUserIsWatching = result;
            }).catch(function (err) {
              console.error(err);
            });
          }).catch(function (err) {
            // Todo log this
            console.error(err);
          });   
        } else {
          throw new Error('The task is not loaded.');
        }

      }
      
      function isCurrentUserWatching () {
        
        var d = $q.defer();
        
        if (!isSomething($scope.task)) return false;
        
        cherryAuth.get().then(function (a) {
          if (_.includes($scope.task.watchers, a.uid)) {
            d.resolve(true);
          } else {
            d.resolve(false);
          }
          
        }).catch(function (err) {
          console.error(err);
          d.reject(false);
        });
        
        return d.promise;
      }
      
      function watch (watcher) {
        
        if (isSomething($scope.task)) {
          
          $scope.task.watchers = $scope.task.watchers || [];
          $scope.task.watchers.push(watcher);
          
          syncTask();
        } else {
          throw new Error('The task is not loaded.'); 
        }
      }
      
      function unwatch (unwatcher) {
        
        if (isSomething($scope.task)) {
          try {
            _.pull($scope.task.watchers, unwatcher);
            syncTask();
          } catch (err) {
            console.error(err);
          } 
        }
        
      }

      // Assignee
      
      $scope.assignedUser = {};
            
      $scope.getAssignedUser = function (uid) {
        cherryAuth.get(uid).then(function (user) {
          $scope.assignedUser = user;
        })
        .catch(function (err) {
          // Todo log this
        });
      };
      
      $scope.isAssigned = function () {
        if ($scope.task) {
          return isSomething($scope.task.assignee);  
        } else {
          return false;
        }
      };
      
      $scope.assign = function (assignee) {
        
        if (assignee) {
          $scope.task.assignee = assignee;
          syncTask();
        } else {
          cherryAuth.get().then(function (a) {
            $scope.task.assignee = a.uid;
            syncTask();
          });  
        }

      };
      
      // Watchers
      
      $scope.currentUserIsWatching = false;
      
      $scope.isWatched = function () {
        if ($scope.task) {
          return isSomething($scope.task.watchers);  
        } else {
          return false;
        }
      };
      
      // This method should not be available if the user is already watching
      $scope.toggleWatch = function (watcher) {
        
        if (!isSomething($scope.task)) return;  // Todo: wait until task is loaded
        
        isCurrentUserWatching().then(function (watching) {
          
          if (watching) {
             if (watcher) {
              unwatch(watcher);
            } else {
              cherryAuth.get().then(function (a) {
                unwatch(a.uid);
              });
            } 
          } else {
            if (watcher) {
              watch(watcher);
            } else {
              cherryAuth.get().then(function (a) {
                watch(a.uid);
              });
            }
          }
        }).catch(function(err) {
          console.error(err);
        });

      };
            
      // Media
      
      var loc = taskId + '/media';
      
      $scope.media = {};
      
      taskService.get(loc, function (mediaItems) {
        $scope.media = mediaItems;
      });
      
    }]);

})(angular, _);
