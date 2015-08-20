'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */
describe('my app', function() {

  browser.get('index.html');

  it('should automatically redirect to /dashboard when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/dashboard");
  });

  describe('dashboard', function() {

    beforeEach(function() {
      browser.get('index.html#/dashboard');
    });


    it('should render dashboard when user navigates to /dashboard', function() {
      expect(element.all(by.css('[ng-view] h2')).first().getText()).
        toMatch(/Home/);
    });

  });


  describe('chat', function() {
     beforeEach(function() {
        browser.get('index.html#/chat');
     });

     it('should render chat when user navigates to /chat', function() {
       expect(element.all(by.css('[ng-view] h2')).first().getText()).
         toMatch(/Chat/);
     });
  });

   describe('account', function() {
      it('should redirect to /signin if not logged in', function() {
         browser.get('index.html#/account');
         expect(browser.getLocationAbsUrl()).toMatch('/signin');
      });

      //todo https://github.com/firebase/angularFire-seed/issues/41
   });

   describe('signin', function() {
      beforeEach(function() {
         browser.get('index.html#/signin');
      });

      it('should render signin when user navigates to /signin', function() {
         expect(element.all(by.css('[ng-view] h2')).first().getText()).toMatch(/Sign in/);
      });

//
//      afterEach(function() {
//         angularFireLogout();
//      });
//

      //todo https://github.com/firebase/angularFire-seed/issues/41
//
//      it('should show error if no email', function() {
//         expect(element('p.error').text()).toEqual('');
//         input('email').enter('');
//         input('pass').enter('test123');
//         element('button[ng-click="signin()"]').click();
//         expect(element('p.error').text()).not().toEqual('');
//      });
//
//      it('should show error if no password', function() {
//         expect(element('p.error').text()).toEqual('');
//         input('email').enter('test@test.com');
//         input('pass').enter('');
//         element('button[ng-click="signin()"]').click();
//         expect(element('p.error').text()).not().toEqual('')
//      });
//
//      it('should log in with valid fields', function() {
//         input('email').enter('test@test.com');
//         input('pass').enter('test123');
//         element('button[ng-click="signin()"]').click();
//         expect(element('p.error').text()).toEqual('');
//      });
   });
});
