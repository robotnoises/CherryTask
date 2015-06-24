(function (angular) {

  'use strict';

  angular.module('myApp')

  .directive('cherryForm', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/directives/cherryForm.html',
      controller: ['$scope', '$location', '$timeout', '$q', 'apiService',
      function cherryFormController ($scope, $location, $timeout, $q, api) {
        
        var template = Object.freeze({
          NEW_PROJECT: '',
          NEW_TASK: 'projects'
        });
        
        var getFormType = function (mod) {
          var $deferred = $q.defer();
          if (mod == template.NEW_PROJECT) {
            $deferred.resolve({ key: 'new_project', apiLoc: 'projects/' });
          } else if (mod == template.NEW_TASK ) {
            $deferred.resolve({ key: 'new_task', apiLoc: '' });
          } else {
            $deferred.reject();
          }
          return $deferred.promise;
        };
        
        var setFormType = function () {
          var uri = $location.$$path.split('/').filter(function(s){ return s !== ''; })[0];
          var $promise = getFormType(uri || '');
          
          $promise.then(function (formData) {
            $timeout(function () {
              $scope.formType = formData.key;
              $scope.formData = formData;
            },0);
          });
        };
        
        $scope.form = {};
        
        $scope.$on('$routeChangeSuccess', function (e) {
          setFormType();
        });
        
        $scope.matchesFormType = function (formTypeData) {
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
        
        $scope.submit = function () {
          api.create($scope.formData.apiLoc, $scope.form, function (snapshot) {
            var obj = angular.copy(snapshot.val());
            obj.id = snapshot.key();
            api.update($scope.formData.apiLoc + snapshot.key(), obj, obj.id);
          });
        };
        
        setFormType();
        
      }]
      
    };
  });

})(angular);
