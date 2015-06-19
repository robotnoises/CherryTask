var config = function (grunt) {
  
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // clean: ['app/dist'],

    // Compile Jade templates
    // Ex: grunt jade --[dev, production]
    
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
    //Ex: grunt cssmin
    
    cssmin: {

      // Target: production
      production: {
        src: 'app/assets/style/compiled/app.css',
        dest: 'app/dist/app.min.css',
      }
    },

    // Minify JS
    // Ex: grunt uglify
    
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
              'app/app.js',                               // main module
              'app/config/config.js',                     // app config
              'app/globals/**/*.js',                   // various components and directives
              'app/modules/dependencies.js',              // register module dependencies
              'app/modules/**/*.js'                       // app modules
            ],
            dest: 'app/dist/app.min.js'
          }
        ]
      }
    },
    
    // Watch for file changes
    // Ex: grunt watch <- does not currently work
    watch: {
      script: {
        files: ['app/templates/*.jade', 'app/templates/partials/*.jade'],
        tasks: ['rebuild'],
        options: {
          spawn: false,
          reload: true
        }
      }  
    },
    
    jshint: {
      files: {
        src: [
          'app.js',
          'app/config/*.js',
          'app/modules/*.js',
          'app/modules/**/*.js',
          'app/global/*.js',
          'app/global/**/*.js'
        ]
      }
    },
    
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/assets/style',
          src: ['*.scss'],
          dest: 'app/assets/style/compiled',
          ext: '.css'
        }]
      }
    }
    
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  
  // Register custom tasks
  grunt.registerTask('rebuild', ['sass', 'jade']);
  grunt.registerTask('cssminify', ['sass', 'cssmin:production']);
  
  
};

module.exports = config;
