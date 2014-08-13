module.exports = function(grunt) {

	'use strict';

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		// Uglify this files
		uglify: {
			dev: {
				options: {
					mangle: false,
					compress: false,
					preserveComments: 'all',
					beautify: true
				},
				files: {
					'www/js/vendor.js': [
						'www_development/js/vendor/jquery.mobile-1.4.3.min.js',
						'www_development/js/vendor/bootstrap.min.js'
					],
					'www/js/main.js': [
						'www_development/js/index.js',
						'www_development/js/index-2.js'
					]
				}
			},
			dist: {
				options: {
					mangle: true,
					compress: true
				},
				files: {
					'www/js/vendor.js': [
						'www_development/js/vendor/jquery.mobile-1.4.3.min.js',
						'www_development/js/vendor/bootstrap.min.js'
					],
					'www/js/main.min.js': [
						'www_development/js/index.js',
						'www_development/js/index-2.js'
					]
				}
			}
		},

		// Define this files to lint
		jshint: {
			files: ['Gruntfile.js', 'www_development/js/index.js', 'www_development/js/index-2.js'],
			options: {
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true
				}
			}
		},

		// Sass configuration
		sass: {
			dev: {
				options: {
					sourceMap: true
				},
				files: {
					'www/css/main.css': 'www_development/sass/main.scss'
				}
			},
			dist: {
				files: {
					'www/css/main.css': 'www_development/sass/main.scss'
				}
			}
		},

		// Watch this files for changes
		watch: {
			files: ['www_development/index.html', 'www_development/css/index.css', 'www_development/js/index.js', 'www_development/js/index-2.js'],
			tasks: ['jshint']
		}

	});

	// load dependences
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');

	// run grunt build
	grunt.registerTask('build', [
		'jshint',
		'uglify:dist',
		'sass:dist',
		'watch'
	]);

	// run grunt default
	grunt.registerTask('default', [
		'jshint',
		'uglify:dev',
		'sass:dev',
		'watch'
	]);

};