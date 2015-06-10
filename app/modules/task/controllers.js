(function (angular) {

  'use strict';

  angular.module('myApp.task')

  .controller('allTasksController', ['$scope', '$routeParams', 'user', 'taskService', 'apiService',
    function ($scope, $routeParams, user, taskService, api) {

      $scope.taskModel = {
        title: '',
        description: '',
        dateCreated: '',
        creator: '',
        assignee: '',
        stage: '',
        priority: '',
        estimation: '',
        elapsed: '',
        id: ''
        // tags: [],
        // watchers: [],
        // attachments: [],
        // messages:
      };

      taskService.list(user, function (tasks) {
        $scope.tasks = tasks;
      });

      $scope.addTask = function () {
        taskService.add($scope.taskModel, user, function (task) {
          var t = task.val();
          t.id = task.key();
          angular.copy(t, $scope.taskModel);
          taskService.update(t);
        });
      };
    }])

  .controller('taskController', ['$scope', '$routeParams', 'user', 'taskService',
    function ($scope, $routeParams, user, taskService) {
      var taskId = $routeParams.id;
      taskService.get(taskId, function (task) {
        $scope.task = task.val();
      });
    }]);

})(angular);
