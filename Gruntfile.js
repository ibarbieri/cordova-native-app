module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
		// define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        src: ['www_development/js/index.js', 'www_development/js/index-2.js'],
        dest: 'www/js/main.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'www/js/main.min.js': ['www_development/js/index.js', 'www_development/js/index-2.js']
        }
      }
    },

    jshint: {
      // define the files to lint
      files: ['Gruntfile.js', 'www_development/js/index.js', 'twww_development/js/index-2.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },

    watch: {
      files: ['www_development/index.html', 'www_development/css/index.css', 'www_development/js/index.js', 'www_development/js/index-2.js'],
      tasks: ['jshint']
    }


	// watch: {
	// 	compass: {
	// 		files: ['sass/{,**/}*.scss'],
	// 		tasks: ['compass:dev']
	// 	},
	// 	js: {
	// 		files: '<%= jshint.all %>',
	// 		tasks: ['jshint', 'uglify:dev']
	// 	},
	// 	livereload: {
	// 		options: {
	// 		livereload: true
	// 	},
	// 	files: [
	// 		'www_development/index.html',
	// 		'www_development/css/index.css',
	// 		'www_development/js/index.js',
	// 		'www_development/js/index-2.js',
	// 		'images/{,**/}*.{png,jpg,jpeg,gif,webp,svg}'
	// 		]
	// 	}
	// },






  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('test', ['jshint']);

  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'watch']);

	// grunt.registerTask('default', [
	// 	'copy',
	// 	'jshint',
	// 	'uglify:dev',
	// 	'compass:dev',
	// 	'watch'
	// ]);




};