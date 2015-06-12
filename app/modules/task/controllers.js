(function (angular) {

  'use strict';

  angular.module('myApp.task')

  .controller('allTasksController', ['$scope', '$routeParams', 'taskService',
    function ($scope, $routeParams, taskService) {

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
        id: '',
        projectId: ''
        // tags: [],
        // watchers: [],
        // attachments: [],
        // messages:
      };

      taskService.list(function (tasks) {
        $scope.tasks = tasks;
      });

      $scope.addTask = function () {
        taskService.add($scope.taskModel, function (task) {
          var t = task.val();
          t.id = task.key();
          taskService.update(t);
        });
      };
    }])

  .controller('taskController', ['$scope', '$routeParams', 'taskService',
    function ($scope, $routeParams, taskService) {
      var taskId = $routeParams.id;
      taskService.get(taskId, function (task) {
        $scope.task = task;
      });
    }]);

})(angular);
