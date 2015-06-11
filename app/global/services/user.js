(function (angular) {

  'use strict';



  angular.module('myApp.global')

  .factory('userService', function() {

    var pub = {};

    var currentUser;

    var _get = function () {

    };

    pub.get = _get;

    return pub;
  }]);

})(angular);
