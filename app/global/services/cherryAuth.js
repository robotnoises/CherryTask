(function (angular) {

  'use strict';

  angular.module('cherry.global')

  .factory('cherryAuth', [ '$q', 'fbutil', '$firebaseObject', 'Auth', 
    function($q, fbutil, $firebaseObject, Auth) {

      var pub = {};
  
      var _currentUser;
      
      // Public
  
      var _get = function () {
        _currentUser = _currentUser || Auth.$getAuth();
        return _currentUser;
      };
      
      var _getFull = function (callback) {
        _currentUser = _currentUser || Auth.$getAuth();
        var ref = fbutil.ref('users', _currentUser.uid);
        ref.once('value', function (snapshot) {
          return callback(snapshot.val());  
        });
      };
      
      var _isAuthenticated = function () {
        return _currentUser || _get();
      };
      
      var _reset = function () {
        if (!_currentUser) {
          _currentUser = undefined;
        }
      };
                  
      pub.get = _get;
      pub.getFull = _getFull;
      pub.isAuthenticated = _isAuthenticated;
      pub.reset = _reset;
            
      return pub;
    }]);

})(angular);
