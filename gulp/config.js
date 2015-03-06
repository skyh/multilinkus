var _ = require('lodash');


exports.release = {
	version: '1.0.1',
	src: 'src',
	res: 'res',
	out: 'out',
	name: 'multilinkus'
};


exports.debug = _.merge(_.clone(exports.release), {
	debug: true
});
