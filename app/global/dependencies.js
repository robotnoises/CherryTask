// Register all module dependencies here

(function (angular) {

  'use strict';

  // Globals
  angular.module('myApp.global', [
    'firebase',
    'firebase.auth',
    'firebase.utils'
  ]);

})(angular);
