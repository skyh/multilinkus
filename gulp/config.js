var _ = require('lodash');


exports.release = {
	version: '1.0',
	src: 'src',
	res: 'res',
	out: 'out'
};


exports.debug = _.merge(_.clone(exports.release), {
	debug: true
});
