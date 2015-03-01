var gulp = require('gulp');
var path = require('path');


module.exports = function (config) {
	return function () {
		return gulp.src(path.join(config.res.dir, '**'))
			.pipe(gulp.dest(config.dst.dir));
	};
};
