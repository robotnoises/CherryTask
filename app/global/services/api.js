(function (angular) {

  'use strict';

  // TODO: move this into getTenant
  var tenantId;

  angular.module('cherry.global')

  .factory('apiService', ['fbutil', '$firebaseObject', '$firebaseArray', '$q', 'chUser',
    function(fbutil, $firebaseObject, $firebaseArray, $q, chUser) {

    var pub = {};

    // Private

    var getTenant = function (callback) {
      // If a tenantId has already been fetched...
      if (tenantId) {
        return callback('tenants/' + tenantId + '/');
      } else {
        // Else, go get it.
        chUser.get(function (user) {
          var ref = fbutil.ref('users', user.uid, 'authorization');
          ref.once('value', function (data) {
            return callback('tenants/' + data.val().tenant + '/');
          });
        });
      }
    };

    // Public

    var _getList = function (loc, limit, callback) {
      getTenant(function (tenant) {
        var ref = fbutil.ref(tenant + loc).limitToLast(limit);
        return callback($firebaseArray(ref));
      });
    };

    var _getListBy = function (loc, key, value, limit, callback) {
      getTenant(function (tenant) {
        var ref = fbutil.ref(tenant + loc);
        var query = ref.orderByChild(key).equalTo(value).limitToLast(limit);
        return callback($firebaseArray(query));
      });
    };

    var _getSingle = function (loc, key, callback) {
      getTenant(function (tenant) {
        var ref = fbutil.ref(tenant + loc + key).orderByKey();
        return callback($firebaseObject(ref));
      });
    };

    var _create = function (loc, data, callback) {
      getTenant(function (tenant) {
        var ref = fbutil.ref(tenant + loc);
        ref.push(data);
        ref.once('child_added', function (snapshot) {
          return callback(snapshot);
        });
      });
    };

    var _update = function (loc, data, priority) {
      getTenant(function (tenant) {
        var ref = fbutil.ref(tenant + loc);
        ref.setWithPriority(data, priority, function (err) {
          if (err) {
            // TODO: error
          }
        });
      });
    };

    pub.list = _getList;
    pub.listBy = _getListBy;
    pub.get = _getSingle;
    pub.create = _create;
    pub.update = _update;

    return pub;
  }]);

})(angular);
