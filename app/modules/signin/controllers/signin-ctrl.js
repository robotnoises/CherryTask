(function (angular) {

  'use strict';

  angular.module('cherry.signin')

  .controller('signinController', ['$rootScope', '$scope', 'Auth', '$location', 'fbutil', 'apiService',
    function($rootScope, $scope, Auth, $location, fbutil, api) {

    // Redirect signed-in users
    if ($rootScope.signedIn) {
      $location.path('/');
    }

    $scope.email = null;
    $scope.pass = null;
    $scope.confirm = null;
    $scope.createMode = false;

    var createTenant = function (callback) {
      // TODO: remove tenant if user is not successfully created
      var tenantModel = {
        name: '',
        date_created: new Date().getTime() // TODO: use firebase time
      };

      var ref = fbutil.ref('tenants');
      ref.push(tenantModel);

      ref.on('child_added', function (snapshot) {
        return callback(snapshot);
      });
    };

    $scope.signin = function(email, pass) {
      $scope.err = null;
      Auth.$authWithPassword({ email: $scope.email, password: $scope.pass }, {rememberMe: true})
        .then(function() {
          // Todo: this should be in an Auth service somewhere
          $rootScope.signedIn = true;
          $location.path('/');
        }, function(err) {
          $scope.err = errMessage(err);
        });
    };

    $scope.createAccount = function() {
      // User: email address and password
      // Generated: tenantId (firebase) and adminStatus (default = true)
      $scope.err = null;
      if(assertValidAccountProps()) {
        var email = $scope.email;
        var pass = $scope.pass;
        // create user credentials in Firebase auth system
        Auth.$createUser({email: email, password: pass})
          .then(function() {
            // authenticate so we have permission to write to Firebase
            return Auth.$authWithPassword({ email: email, password: pass });
          })
          .then(function(user) {
            createTenant(function (tenantData) {
              // create a user profile in our data store
              var ref = fbutil.ref('users', user.uid);
              var model = {
                email: email,
                name: name || firstPartOfEmail(email),
                date_created: new Date().getTime(),
                authorization: {
                  isAdmin: true,
                  tenant: tenantData.key()
                }
              };
              ref.set(model);
            });
          })
          .then(function() {
            // redirect to the account page
            // $location.path('/dashboard?tour=true');
            $location.path('/');
          }, function(err) {
            $scope.err = errMessage(err);
          });
      }
    };

    function assertValidAccountProps() {
      if (!$scope.email) {
        $scope.err = 'Please enter an email address';
      }
      else if( !$scope.pass || !$scope.confirm ) {
        $scope.err = 'Please enter a password';
      }
      else if( $scope.createMode && $scope.pass !== $scope.confirm ) {
        $scope.err = 'Passwords do not match';
      }
      return !$scope.err;
    }

    function errMessage(err) {
      return angular.isObject(err) && err.code? err.code : err + '';
    }

    function firstPartOfEmail(email) {
      return ucfirst(email.substr(0, email.indexOf('@'))||'');
    }

    function ucfirst (str) {
      // inspired by: http://kevin.vanzonneveld.net
      str += '';
      var f = str.charAt(0).toUpperCase();
      return f + str.substr(1);
    }
  }]);

})(angular);
