var del = require('del');
var path = require('path');


module.exports = function (config) {
	return function (cb) {
		del(path.join(config.dst.dir, '*'), cb);
	};
};
