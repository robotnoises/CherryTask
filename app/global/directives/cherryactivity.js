(function (angular) {

  'use strict';

  angular.module('cherry')

  .directive('cherryActivity', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/directives/cherry-activity.html',
      controller: ['$scope', '$routeParams', 'fbutil', 'apiService', 'cherryAuth',
      function taskChatController ($scope, $routeParams, fbutil, api, cherryAuth) {
        
        var taskId = $routeParams.id;
        var loc = 'tasks/' + taskId + '/messages';
        
        api.list(loc, 10, function (messages) {
          $scope.messages = messages;
        });
        
        $scope.addMessage = function(newMessage) {
          if (newMessage) {
            cherryAuth.get().then(function (a) {
              $scope.messages.$add({
                user: '@' + a.name,
                text: newMessage,
                timeStamp: new Date().getTime()
              });
            });
          }
        };
      }]
    };
  });

})(angular);
