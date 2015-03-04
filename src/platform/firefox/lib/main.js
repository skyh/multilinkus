'use strict';

var api = require('mtl/core/api');
var tabs = require('sdk/tabs');
var pageMod = require('sdk/page-mod');

pageMod.PageMod({
	include: '*',
	contentScriptFile: './ui.js',
	onAttach: function (worker) {
		worker.port.on('openLinks', function (links) {
			var linksForOpening = api.filterLinks(links);
			linksForOpening.forEach(function (link) {
				tabs.open({
					url: link,
					inBackground: true
				});
			});
		});
	}
});
