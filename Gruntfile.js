module.exports = function(grunt) {

	'use strict';

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		// Before generating any new files, remove any previously-created files.
		clean: {
			build: ['www/']
		},

		// Minify HTML
		htmlmin: {
			dev: {
				files: {
					'www/index.html': 'www_development/index.html'
				}
			},
			build: {
				options: {
				removeComments: true,
				collapseWhitespace: true
			},
			files: {
					'www/index.html': 'www_development/index.html'
				}
			}
		},

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
						'www_development/js/vendor/jquery-1.11.1.min.js',
						'www_development/js/vendor/jquery.mobile-1.4.3.min.js'
					],
					'www/js/main.js': [
						'www_development/js/index.js',
						'www_development/js/index-2.js'
					]
				}
			},
			build: {
				options: {
					mangle: true
				},
				files: {
					'www/js/vendor.min.js': [
						'www_development/js/vendor/jquery-1.11.1.min.js',
						'www_development/js/vendor/jquery.mobile-1.4.3.min.js'
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
			build: {
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
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');

	// run grunt build
	grunt.registerTask('build', [
		'clean',
		'htmlmin:build',
		'jshint',
		'uglify:build',
		'sass:build',
		'watch'
	]);

	// run grunt default
	grunt.registerTask('default', [
		'clean',
		'htmlmin:dev',
		'jshint',
		'uglify:dev',
		'sass:dev',
		'watch'
	]);

};