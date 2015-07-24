/* global it */
/* global inject */
/* global expect */
/* global describe */
/* global beforeEach */

describe('cherry.account', function() {
  
  beforeEach(function() {
    module('cherry');
    module('cherry.account');
  });

  describe('accountController', function() {
    var ctrl, scope;
    
    beforeEach(function() {
      module(function($provide) {
        // comes from routes.js in the resolve: {} attribute
        $provide.value('user', {uid: 'test123'});
      });

      inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        ctrl = $controller('accountController', { $scope: scope });
      });
    });

    // Begin tests
    
    it('should define logout method', function() {
      expect(typeof ctrl.$scope.logout).toBe('function');
    });

  });
});