(function (angular) {

  'use strict';

  angular.module('cherry')

  .directive('taskChat', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/directives/taskChat.html',
      controller: ['$scope', '$routeParams', 'fbutil', 'apiService', 'chUser',
      function taskChatController ($scope, $routeParams, fbutil, api, chUser) {
        
        var taskId = $routeParams.id;
        var loc = 'tasks/' + taskId + '/messages';
        
        api.list(loc, 10, function (messages) {
          $scope.messages = messages;
        });
        
        $scope.addMessage = function(newMessage) {
          if (newMessage) {
            chUser.getFull(function (currentUser) {
              $scope.messages.$add({
                user: '@' + currentUser.name,
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
