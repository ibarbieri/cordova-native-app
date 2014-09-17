module.exports = function(grunt) {

	'use strict';

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		// Before generating any new files, remove any previously-created files.
		clean: {
			build: ['www/*.html', 'www/css/', 'www/js/']
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
					'www/js/vendor.min.js': [
						'www_development/js/vendor/jquery-1.11.1.min.js',
						//'www_development/js/vendor/ratchet.min.js',
						'www_development/js/vendor/push.js',
						'www_development/js/vendor/toggles.js',
						'www_development/js/vendor/sliders.js',
						'www_development/js/vendor/moment.min.js'
					],
					'www/js/app-core.min.js': [
						'www_development/js/app-core.js',
						'www_development/js/get-home-data.js',
						'www_development/js/get-news-data.js',
						'www_development/js/get-videos-data.js',
						'www_development/js/get-fixture-data.js',
						'www_development/js/app-start.js'
					]
				}
			},
			build: {
				options: {
					mangle: true
				},
				files: {
					'www/js/vendor/vendor.min.js': [
						'www_development/js/vendor/jquery-1.11.1.min.js',
						//'www_development/js/vendor/ratchet.min.js',
						'www_development/js/vendor/push.js',
						'www_development/js/vendor/toggles.js',
						'www_development/js/vendor/sliders.js',
						'www_development/js/vendor/moment.min.js',
					],
					'www/js/app-core.min.js': [
						'www_development/js/app-core.js',
						'www_development/js/get-home-data.js',
						'www_development/js/get-news-data.js',
						'www_development/js/get-videos-data.js',
						'www_development/js/get-fixture-data.js',
						'www_development/js/app-start.js'
					]
				}
			}
		},

		// Define this files to lint
		jshint: {
			files: [
					'Gruntfile.js',
					'www_development/js/app-core.js',
					'www_development/js/get-home-data.js',
					'www_development/js/get-news-data.js',
					'www_development/js/get-videos-data.js',
					'www_development/js/get-fixture-data.js',
					'www_development/js/app-start.js'
					],
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
			      style: 'expanded',
			      compass: true
			    },
				files: {
					'www_development/css/app-core.css': 'www_development/sass/app-core.scss'
				}
			},
			build: {
			    options: {
			      style: 'compress',
			      compass: true
			    },
				files: {
					'www/css/app-core.min.css': 'www_development/sass/app-core.scss'
				}
			}
		},

		// Combine adn minify the vendors css resources
		cssmin: {
			combine: {
				files: {
					'www/css/vendor/vendor.min.css': ['www_development/css/vendor/ratchet.min.css',
													  'www_development/css/vendor/ratchet-theme-ios.min.css',
													  'www_development/css/vendor/bootstrap.min.css',
													  'www_development/css/vendor/font-awesome.min.css']
				}
			},
			minify: {
			    expand: false,
			    cwd: 'www/css/',
			    src: ['*.css'],
			    dest: 'www/css/'
		  	}
		},

		// Watch this files for changes
		watch: {
			scripts: {
				files: 'www_development/**/*.js',
				tasks: ['jshint'],
			},
			// css: {
			// 	files: '**/*.sass',
			// 	tasks: ['sass'],
			// 	options: {
			// 		livereload: true,
			// 	},
			// },
		},

		// Change the url of the static resources
		processhtml: {
			build: {
				files: {
					'www/index.html': ['www_development/index.html'],
					'www/news.html': ['www_development/news.html'],
					'www/fixture.html': ['www_development/fixture.html'],
					'www/videos.html': ['www_development/videos.html'],
					'www/alerts.html': ['www_development/alerts.html'],
				}
			}
		},

		// Minify HTML
		htmlmin: {
			build: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					'www/index.html': 'www/index.html'
				}
			}
		},

		// http server
		'http-server': {

            // the server root directory
            root: '/Users/ibarbieri/Documents/workspace/cordova-native-app/www',

            port: 8282,

            host: "127.0.0.1",

            cache: false,
            showDir : true,
            autoIndex: true,
            defaultExt: "html",

            // run in parallel with other tasks
            runInBackground: true|false
    	}


	}); // end task

	// load dependences
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-processhtml');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-http-server');

	// run grunt build
	grunt.registerTask('build', [
		'clean',
		'processhtml:build',
		'htmlmin:build',
		'cssmin',
		'jshint',
		'uglify:build',
		'sass:build',
		'http-server',
		'watch:scripts'
	]);

	// run grunt default
	grunt.registerTask('default', [
		'jshint',
		'uglify:dev',
		'sass:dev',
		'http-server',
		'watch:scripts'
	]);

};