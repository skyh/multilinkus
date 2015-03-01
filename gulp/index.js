var gulp = require('gulp');
var config = require('./config');
var make_chrome = require('./make_chrome');
var make_safari = require('./make_safari');


gulp.task('build', ['build-chrome', 'build-safari']);

gulp.task('build-chrome', function () {
	var cfg = config.debug;

	return [
		make_chrome.js(cfg),
		make_chrome.res(cfg)
	];
});

gulp.task('build-safari', function () {
	var cfg = config.debug;

	return [
		make_safari.js(cfg),
		make_safari.res(cfg)
	];
});
