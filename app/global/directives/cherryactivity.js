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
        
        $scope.activityType = TYPE.COMMENT;
        $scope.activityValue = '';
        
        api.list(loc, 10, function (activities) {
          $scope.activities = activities;
        });
        
        $scope.addActivity = function(activity) {
          if (activity) {
            cherryAuth.get().then(function (auth) {
              $scope.activities.$add({
                user: '@' + auth.name,  // Todo: need to record the uid and not the name, since names are aliases and can change
                text: activity,
                type: $scope.activityType, 
                value: $scope.activityValue,
                timeStamp: new Date().getTime()
              });
            });
          }
        };
      }]
    };
  });

})(angular);
