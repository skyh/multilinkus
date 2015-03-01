var replace = require('gulp-replace-task');


module.exports = function (config) {
	return replace({
		patterns: [
			{
				json: config
			}
		]
	});
};

