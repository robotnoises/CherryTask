/* global angular */

(function (angular) {

  'use strict';

  angular.module('cherry.global')

  .factory('cherryUser', [ '$q', 'fbutil', '$firebaseObject', 'Auth', function($q, fbutil, $firebaseObject, Auth) {

    var pub = {};

    var currentUser;

    // Public

    var _get = function () {
      currentUser = currentUser || Auth.$getAuth();
      return currentUser;
    };
    
    var _getFull = function (callback) {
      currentUser = currentUser || Auth.$getAuth();
      var ref = fbutil.ref('users', currentUser.uid);
      ref.once('value', function (snapshot) {
        return callback(snapshot.val());  
      });
    };
    
    var reset = function () {
      currentUser = undefined;
    };

    pub.get = _get;
    pub.getFull = _getFull;
    pub.reset = reset;
    
    return pub;
  }]);

})(angular);
