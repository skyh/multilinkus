var path = require('path');
var _ = require('lodash');


exports.release = {
	config: {
		name: 'release'
	},

	version: '1.0.1',
	src: 'src',
	res: 'res',
	out: 'out',
	pkg: path.join('out', 'pkg'),
	name: 'multilinkus',

	author: {
		name: 'Andrey Ivlev',
		site: 'http://about.me/skyh',
		email: 'skyh@ya.ru'
	},

	safari: {
		DownloadUrlPrefix: 'http://skyh.github.io/multilinkus/downloads', // no trailing slash
		CFBundleDisplayName: 'Multilinkus',
		CFBundleIdentifier: 'com.multilinkus',
		DeveloperIdentifier: 'F2J98NM69V',
		Description: 'Open links from area. Use ⌥ + selection.',
		UpdateManifest: 'safari-update.plist',
		Website: 'http://skyh.github.io/multilinkus/'
	}
};


exports.debug = _.merge(_.cloneDeep(exports.release), {
	config: {
		name: 'debug'
	},

	debug: true,

	safari: {
		CFBundleDisplayName: 'Multilinkus (debug)'
	}
});
