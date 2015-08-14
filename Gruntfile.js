var config = function (grunt) {
  
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

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
              // main module
              'app/app.js',
              // any additional lib files not managed by bower
              'app/assets/js/lib/*.js',
              // global controllers/directives/services
              'app/global/*.js',
              'app/global/**/*.js',
              // app modules                           
              'app/modules/*.js',           
              'app/modules/**/*.js',
            ],
            dest: 'app/dist/app.min.js'
          }
        ]
      }
    },
    
    // Watch for file changes
    // Ex: grunt watch
    watch: {
      script: {
        files: [
          'app/templates/*.jade', 
          'app/templates/partials/*.jade', 
          'app/assets/style/*.scss'
        ],
        tasks: ['build-dev'],
        options: {
          spawn: false,
          reload: true
        }
      }  
    },
    
    // Static analysis
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
    
    // Compile sass
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
    },
    
    // Test runner
    karma: {
      unit: {
        configFile: 'karma.conf.js'
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
  grunt.loadNpmTasks('grunt-karma');
  
  // Register custom tasks
  grunt.registerTask('build-dev', ['sass', 'jade:dev']);
  grunt.registerTask('build-prod', ['sass', 'cssmin:production', 'jade:production', 'uglify:production']);
    
};

module.exports = config;
