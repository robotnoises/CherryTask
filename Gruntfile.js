var config = function (grunt) {
  
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: ['app/dist'],

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
        expand: true,
        cwd: 'app/assets/style/',
        src: ['*.css'],
        dest: 'app/dist/',
        ext: '.min.css'
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
    },
    
    // Watch for file changes
    
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
    }
    
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  
  // Register tasks
  grunt.registerTask('rebuild', ['jade']);
};

module.exports = config;
