(function (angular) {

  'use strict';

  // TODO: move this into getTenant
  var tenantId;
  var currentUser;

  angular.module('myApp.global')

  .factory('apiService', ['$rootScope', 'fbutil', '$firebaseArray', '$q',
    function($rootScope, fbutil, $firebaseArray, $q) {

    var pub = {};

    // Private

    var getTenant = function (callback) {
      // If a tenantId has already been fetched...
      if (tenantId) return callback('tenants/' + tenantId + '/');

      var user = currentUser = (currentUser) ? currentUser : $rootScope.user;

      // Else, go get it.
      var ref = fbutil.ref('users', user.uid, 'authorization');
      ref.on('value', function (data) {
        return callback('tenants/' + data.val().tenant + '/');
      });
    };

    // Public

    var _get = function (loc, limit, callback) {
      getTenant(function (tenant) {
        var ref = fbutil.ref(tenant + loc).limitToLast(limit);
        ref.on('value', function () {
          callback($firebaseArray(ref));
        });
      });
    };

    var _getSingle = function (loc, key, callback) {
      getTenant(function (tenant) {
        var ref = fbutil.ref(tenant + loc + key).orderByKey();
        ref.on('value', function (snapshot) {
          return callback(snapshot);
        });
      });
    };

    var _create = function (loc, data, callback) {
      getTenant(function (tenant) {
        var ref = fbutil.ref(tenant + loc);
        ref.push(data);
        ref.on('child_added', function (snapshot) {
          // val() for value
          // key() for pushId
          return callback(snapshot);
        });
      });
    };

    var _update = function (loc, data) {
      getTenant(function (tenant) {
        var ref = fbutil.ref(tenant + loc);
        ref.set(data);
      });
    };

    pub.get = _get;
    pub.getSingle = _getSingle;
    pub.create = _create;
    pub.update = _update;

    return pub;
  }]);

})(angular);
