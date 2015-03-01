var browserify = require('browserify');
var gulp = require('gulp');
var gulpIf = require('gulp-if');
var path = require('path');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');



module.exports = function (config) {

	function needUglify() {
		return config.src.uglify;
	}

	return function () {
		var SRC = config.src;
		var DST = config.dst;

		function taskPart(src, dst) {
			return browserify(src, config.browserifyOptions)
				.bundle()
				.on('error', function (error) {
					console.error(error);
				})
				.pipe(source(dst))
				.pipe(buffer())
				.pipe(gulpIf(needUglify, uglify()))
				.pipe(gulp.dest(DST.dir));
		}

		return [
			taskPart(SRC.background, DST.background),
			taskPart(SRC.content_script, DST.content_script)
		];
	};
};
