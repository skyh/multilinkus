var gulp = require('gulp');
var debug = require('./config').debug;
var release = require('./config').release;

var make_chrome = require('./make_chrome');
var make_safari = require('./make_safari');
var make_firefox = require('./make_firefox');


gulp.task('default', ['release']);
gulp.task('build', ['build-chrome', 'build-safari', 'build-firefox']);
gulp.task('release', ['release-chrome', 'release-safari', 'release-firefox']);
gulp.task('clean', ['clean-chrome', 'clean-safari', 'clean-firefox']);

gulp.task('watch', ['build'], function () {
	gulp.watch([
		debug.src + '/**',
		debug.res + '/**'
	], ['build']);
});


gulp.task('build-chrome', function () {
	return [
		make_chrome.js(debug),
		make_chrome.res(debug)
	];
});

gulp.task('build-safari', function () {
	return [
		make_safari.js(debug),
		make_safari.res(debug)
	];
});

gulp.task('build-firefox', function () {
	return [
		make_firefox.js(debug),
		make_firefox.res(debug)
	];
});

gulp.task('release-chrome', ['clean-chrome'], function () {
	return Promise.all([
		make_chrome.js(release),
		make_chrome.res(release)
	]);
});

gulp.task('release-safari', ['clean-safari'], function () {
	return [
		make_safari.js(release),
		make_safari.res(release)
	];
});

gulp.task('release-firefox', ['clean-firefox'], function () {
	return [
		make_firefox.js(release),
		make_firefox.res(release)
	];
});

gulp.task('clean-chrome', function () {
	return make_chrome.clean(release);
});

gulp.task('clean-safari', function () {
	return make_safari.clean(release);
});

gulp.task('clean-firefox', function () {
	return make_firefox.clean(release);
});

gulp.task('pack-chrome', ['release-chrome'], function () {
	return make_chrome.pack(release);
});
