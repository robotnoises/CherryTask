(function (angular) {
  
  'use strict';
  
  // Declare app level module which depends on filters, and services
  angular.module('cherry.config', ['firebase.utils'])
  
    .constant('version', '0.0.1')

    .constant('loginRedirectPath', '/signin')
    
    .constant('FBURL', 'https://09sdfgs.firebaseio.com/');
  
})(angular);


