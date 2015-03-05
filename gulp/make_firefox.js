'use strict';

var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var gulpIf = require('gulp-if');
var path = require('path');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var tokenize = require('./tokenize');
var del = require('del');
var Promise = require('q').Promise;


var firefoxOut = function (config) {
	return path.join(config.out, config.name + '.firefox-extension');
};


exports.js = function (config) {
	var src = path.join(config.src, 'platform', 'firefox');
	var out = firefoxOut(config);
	var needUglify = !config.debug;

	var jsFiles = [
		'lib/main.js',
		'data/ui.js'
	];

	return Promise.all(jsFiles.map(function (file) {
		var module = ['.', src, file].join(path.posix.sep);

		return new Promise(function (resolve) {
			browserify(module, {
				baseDir: src,
				debug: config.debug,
				ignoreMissing: true
			}).bundle().on('error', function (error) {
				console.error(error.message);
			})
			.pipe(source(file))
			.pipe(buffer())
			.pipe(tokenize(config))
			.pipe(gulpIf(needUglify, uglify()))
			.pipe(gulp.dest(out))
			.on('end', function () {
				resolve();
			}).on('error', function () {
				reject();
			})
		});
	}));
};


exports.res = function (config) {
	var resources = path.join(config.res, 'firefox', '**');
	var out = firefoxOut(config);

	return gulp.src(resources)
		.pipe(tokenize(config))
		.pipe(gulp.dest(out));
};


exports.clean = function (config) {
	return new Promise(function (resolve, reject) {
		del(firefoxOut(config), function (err, files) {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
};


exports.pack = function (config) {
	return new Promise.reject(new Error('Not implemented.'));
};
