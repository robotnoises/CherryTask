module.exports = function (config) {
  
  var configuration = {
    
    basePath : './',

    files : [
      
      // Dependencies
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-animate/angular-animate.js',
      'app/bower_components/angular-aria/angular-aria.js',
      'app/bower_components/angular-material/angular-material.js',
      'app/bower_components/angular-messages/angular-messages.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/mockfirebase/browser/mockfirebase.js',
      'app/bower_components/angularfire/dist/angularfire.js',
      'app/bower_components/firebase/firebase.js',
      'app/bower_components/angular-perfect-scrollbar/src/angular-perfect-scrollbar.js',
      'app/bower_components/angular-file-upload/dist/angular-file-upload.min.js',
      'app/bower_components/aws-sdk-js/dist/aws-sdk.js',
      'app/bower_components/lodash/lodash.min.js',
      
      // Test lib
      'tests/lib/*.js',
      
      // App
      'app/app.js',
      'app/global/*.js',
      'app/global/**/*.js',
      'app/modules/*.js',
      'app/modules/**/*.js',
      'app/modules/**/**/*.js',
      
      // Unit Tests
      'tests/unit-tests/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],
    
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    plugins : [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },
    
    logLevel: 'DEBUG'
  };
  
  if (process.env.TRAVIS){
    configuration.browsers = ['Chrome_travis_ci'];
  }
  
  config.set(configuration);

};
