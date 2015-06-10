var config = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: ['app/dist'],

    // Compile Jade templates

    jade: {

      //Target: dev
      dev : {
        options: {
          pretty: true,
          data: {
            debug: true
          }
        },
        files: {
          'app/index.html': 'app/templates/index-dev.jade'
        }
      },

      // Target: production
      production: {
        options: {
          pretty: true,
          data: {
            debug: false
          }
        },
        files: {
          'app/index.html': 'app/templates/index-production.jade'
        }
      }
    },

    // Minify CSS

    cssmin: {

      // Target: production
      production: {
        expand: true,
        cwd: 'app/assets/style/',
        src: ['*.css'],
        dest: 'app/dist/',
        ext: '.min.css'
      }
    },

    // Minify JS

    uglify: {

      // Options
      options: {
        report: 'min',
        mangle: true
      },

      // Target: production
      production: {
        files: [
          {
            src: [
              'app/bower_components/skyblue/js/ie/*.js',  // skyblue ie shiv
              'app/app.js',                               // main module
              'app/config/config.js',                     // app config
              'app/routes.js',                            // app routing
              'app/components/**/*.js',                   // various components and directives
              'app/modules/dependencies.js',              // register module dependencies
              'app/modules/**/*.js'                       // app modules
            ],
            dest: 'app/dist/app.min.js'
          }
        ]
      }
    }
  });

  // Load Tasks
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
};

module.exports = config;
