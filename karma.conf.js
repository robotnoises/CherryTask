module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      // Libs
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/mockfirebase/browser/mockfirebase.js',
      'app/bower_components/angularfire/dist/angularfire.js',
      // Test Libs
      'tests/lib/**/*.js',
      // CherryTask
      'app/app.js',
      'app/global/*.js',
      'app/global/**/*.js',
      'app/global/**/**/*.js',
      'app/modules/*.js',
      'app/modules/**/*.js',
      'app/modules/**/**/*.js',
      // Unit Tests
      'tests/unit-tests/foo_test.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Firefox'],

    plugins : [
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
