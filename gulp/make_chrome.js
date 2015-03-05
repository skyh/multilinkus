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


var chromeOut = function (config) {
	return path.join(config.out, config.name + '.chrome-extension');
};


exports.js = function (config) {
	var src = path.join(config.src, 'platform', 'chrome');
	var out = chromeOut(config);
	var needUglify = !config.debug;

	var jsFiles = [
		'background.js',
		'ui.js'
	];

	return Promise.all(jsFiles.map(function (file) {
		var module = ['.', src, file].join(path.posix.sep);

		return new Promise(function (resolve) {
			browserify(module, {
				baseDir: src,
				debug: config.debug
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
				resolve();
			}
		});
	});
};


exports.pack = function (config) {
	return new Promise(function (resolve) {
		var fs = require('fs');
		var archiver = require('archiver');

		var srcDirectory = chromeOut(config);
		var outputPath = path.join(
			path.dirname(srcDirectory),
			path.basename(srcDirectory) + '.zip'
		);

		var output = fs.createWriteStream(outputPath);
		var zipArchive = archiver('zip');

		output.on('close', function() {
			console.log('done with the zip', outputPath);
		});

		zipArchive.pipe(output);

		zipArchive.bulk([
			{ src: [ '**/*' ], cwd: srcDirectory, expand: true }
		]);

		zipArchive.finalize(function(err, bytes) {

			if (err) {
				throw err;
			}

			console.log('done:', base, bytes);
		});
	});
};
