'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp.config', ['firebase.utils'])

  // version of this seed app is compatible with angularFire 1.0.0
  // see tags for other versions: https://github.com/firebase/angularFire-seed/tags
  .constant('version', '0.0.1')

  // where to redirect users if they need to authenticate (see security.js)
  .constant('loginRedirectPath', '/login')

  // Todo: need to move this to another file
  // your Firebase data URL goes here, no trailing slash
  .constant('FBURL', 'https://09sdfgs.firebaseio.com/');
