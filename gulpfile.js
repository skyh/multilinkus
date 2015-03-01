var tasks = require('requireindex')('./tools/gulp_tasks');
var gulp = require('gulp');
var sequence = require('run-sequence');
var zip = require('gulp-zip');


var config = {
	src: {
		dir: './src',
		background: './src/chrome/background.js', // as require module!
		content_script: './src/chrome/ui.js',
		uglify: false
	},
	
	dst: {
		dir: './out/build',
		background: 'background.js',
		content_script: 'ui.js'
	},

	res: {
		dir: 'res'
	},

	browserifyOptions: {
		baseDir: 'src',
		debug: true
	}
};


Object.keys(tasks).forEach(function (taskname) {
	gulp.task(taskname, tasks[taskname](config));
});


gulp.task('update', function () {
	return sequence(['sources', 'resources']);
});

gulp.task('release', function () {
	config.browserifyOptions.debug = false;
	config.dst.dir = './out/release';
	config.src.uglify = true;

	return sequence(
		['clean'],
		['sources', 'resources']
	);
});

gulp.task('default', ['update']);

gulp.task('zip', ['release'], function () {
	return gulp.src(config.dst.dir)
		.pipe(zip('multilinkus.zip'))
		.pipe(gulp.dest('./release-package/'))
});
