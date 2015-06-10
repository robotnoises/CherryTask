
describe('myApp.signin', function() {
  beforeEach(function() {
    module('myApp');
    module('myApp.signin');
  });

  describe('SigninCtrl', function() {
    var signinCtrl, $scope;
    beforeEach(function() {
      inject(function($controller) {
        $scope = {};
        signinCtrl = $controller('SigninCtrl', {$scope: $scope});
      });
    });

    it('should define signin function', function() {
      expect(typeof $scope.signin).toBe('function');
    });

    it('should define createAccount function', function() {
      expect(typeof $scope.createAccount).toBe('function');
    });
  });
});
