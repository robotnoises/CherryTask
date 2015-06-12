/* global angular */

(function (angular) {

  'use strict';

  angular.module('myApp')

  .directive('taskChat', ['$rootScope' , function($rootScope) {
    return {
      restrict: 'E',
      scope: {
        taskId: '@taskid'
      },
      templateUrl: 'templates/directives/taskChat.html',
      controller: ['$scope', '$rootScope', 'fbutil', 'apiService',
      function taskChatController ($scope, $rootScope, fbutil, api) {
        var loc = 'tasks/' + $scope.taskId + '/messages';
        api.list(loc, 10, function (messages) {
          $scope.messages = messages;
        });
        $scope.addMessage = function(newMessage) {
          if (newMessage) {
            $scope.messages.$add({
              text: newMessage,
              timeStamp: new Date().getTime()
            });
          }
        };
      }]
    };
  }]);

})(angular);
