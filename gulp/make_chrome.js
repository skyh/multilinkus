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
var Promise = require('Q').Promise;


var chromeOut = function (config) {
	return path.join(config.out, 'multilinkus.chromeextension');
};


exports.js = function (config) {
	var src = path.join(config.src, 'platform', 'chrome');
	var out = chromeOut(config);
	var needUglify = !config.debug;

	var jsFiles = [
		'background.js',
		'ui.js'
	];

	return jsFiles.map(function (file) {
		var module = ['.', src, file].join(path.sep);

		return browserify(module, {
				baseDir: src,
				debug: config.debug
			}).bundle().on('error', function (error) {
				console.error(error.message);
			})
			.pipe(source(file))
			.pipe(buffer())
			.pipe(tokenize(config))
			.pipe(gulpIf(needUglify, uglify()))
			.pipe(gulp.dest(out));
	});
};


exports.res = function (config) {
	var resources = path.join(config.res, 'chrome', '**');
	var out = chromeOut(config);
	
	return gulp.src(resources)
		.pipe(tokenize(config))
		.pipe(gulp.dest(out));
};


exports.clean = function (config) {
	return new Promise(function (resolve, reject) {
		del(chromeOut(config), function (err, files) {
			if (err) {
				reject(err);
			} else {
				resolve(files);
			}
		});
	});
};
