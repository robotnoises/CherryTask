(function (angular) {

  'use strict';

  angular.module('cherry')

  .directive('cherryForm', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/directives/cherry-form.html',
      controller: ['$scope', '$location', '$timeout', '$q', '$routeParams', 'apiService',
      function cherryFormController ($scope, $location, $timeout, $q, $routeParams, api) {
        
        var getFormType = function (uri) {
          var $deferred = $q.defer();
          
          if (uri === '') {
            $deferred.resolve({ key: 'project', apiLoc: 'projects/' });
          } else if (uri == 'projects' ) {
            $deferred.resolve({ key: 'task', apiLoc: 'tasks/', projectId: $routeParams.id });
          } else {
            $deferred.reject();
          }
          
          return $deferred.promise;
        };
        
        var init = function () {
          
          var uri = $location.$$path.split('/').filter(function(s){ return s !== ''; })[0];
          
          var $promise = getFormType(uri || '');
          
          $promise.then(function (formData) {
            $timeout(function () {
              $scope.form.type = $scope.formType = formData.key;
              $scope.formData = formData;
            },0);
          }).catch(function (err) {
            console.error(err);
          });
        };
        
        var matchesFormType = function (formTypeData) {
          if (Array.isArray(formTypeData)) {
            for (var i = 0, len = formTypeData.length; i < len; i++) {
              if (formTypeData[i] == $scope.formType) {
                return true;
              }
            }
            return false;
          } else {
            return formTypeData == $scope.formType;
          }
        };
        
        var reset = function (timeout) {
          
          // Todo : this is bad 
          $scope.form = {};
          angular.element('.modal-close').click();
          
        };
                
        $scope.form = {};
        
        $scope.$on('$routeChangeSuccess', function (e) {
          init();
        });
        
        $scope.calc = function (value, unit) {
          return value + unit;
        };
        
        $scope.matchesFormType = matchesFormType;
        
        $scope.submit = function () {
          
          var $form = $scope.form;
          
          if (matchesFormType('task')) {
            $form.projectId = $scope.formData.projectId;
            $form.progress = 0;
            $form.mood = 50;
          }
          
          api.create($scope.formData.apiLoc, $form).then(function (snap) {
            // Todo
          }).catch(function (err) {
            console.error(err);
          });
            
          reset();
          
        };
        
        // Init the form
        init();
        
      }]
    };
  });

})(angular);
