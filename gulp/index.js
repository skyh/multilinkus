var gulp = require('gulp');
var config = require('./config');
var make_chrome = require('./make_chrome');
var make_safari = require('./make_safari');


gulp.task('default', ['release']);
gulp.task('build', ['build-chrome', 'build-safari']);
gulp.task('release', ['release-chrome', 'release-safari']);
gulp.task('clean', ['clean-chrome', 'clean-safari']);


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

gulp.task('release-chrome', ['clean-chrome'], function () {
	var cfg = config.release;

	return [
		make_chrome.js(cfg),
		make_chrome.res(cfg)
	];
});

gulp.task('release-safari', ['clean-safari'], function () {
	var cfg = config.release;

	return [
		make_safari.js(cfg),
		make_safari.res(cfg)
	];
});

gulp.task('clean-chrome', function () {
	return make_chrome.clean(config.release);
});

gulp.task('clean-safari', function () {
	return make_safari.clean(config.release);
});
