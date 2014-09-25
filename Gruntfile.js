module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    watch: {
      less: {
        files: ['css/less/*.less', 'js/*', 'js/*/*'],
        tasks: ['less', 'concat', 'uglify'],
        options: {
          spawn: false
        },
      }
    },

    less: {
      production: {
        options: {
          paths: ["css"],
          cleancss: true
        },
        files: {
          "css/style.css": "css/less/style.less"
        }
      }
    },

    concat: {
      options: {
        separator: '\n',
      },
      dist: {
        src: [
        'Gruntfile.js',
        /*
            The order defined below is necessary or else everything will break
            Views also need to be declared in order of dependency
         */
        ///  Models First
        'js/models/*.js',

        ///  Collections Second
        'js/collections/*.js',

        ///  Views Third
        'js/views/View_A.js',
        'js/views/View_B.js',
        'js/views/MainView.js',
        'js/views/HeaderView.js',
        'js/views/FooterView.js',
        'js/views/HomeView.js',
        'js/views/ImagesView.js',
        ///  Router Fourth
        'js/router.js',
        ///  App.js Last
        'js/App.js'
        ],
        dest: 'production/concat.js'
      }
    },

    uglify: {
    my_target: {
      files: {
        'production/production.min.js': ['production/concat.js']
      }
    }
    },

    jsbeautifier : {
      files : ["js/*.js","js/views/*.js","js/collections/*.js","js/models/*.js"],
      options : {
      }
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default');

};