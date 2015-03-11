'use strict';

var api = require('mtl/core/api');
var tabs = require('sdk/tabs');
var pageMod = require('sdk/page-mod');
var self = require('sdk/self');


var contentScriptFile = './ui.js';

function listenTabMessages(port) {
	port.on('openLinks', function (links) {
		var linksForOpening = api.filterLinks(links);
		linksForOpening.forEach(function (link) {
			tabs.open({
				url: link,
				inBackground: true
			});
		});
	});
}

pageMod.PageMod({
	include: '*',
	contentScriptFile: contentScriptFile,
	onAttach: function (worker) {
		listenTabMessages(worker.port);
	}
});

var loadReason = self.loadReason;
var initUrlTest = /https?:/i;

if (loadReason === 'install') {
	for (var i in tabs) {
		var tab = tabs[i];
		var url = tab.url;

		if (true || initUrlTest.test(url)) {
			var worker = tab.attach({
				contentScriptFile: contentScriptFile
			});

			listenTabMessages(worker.port);
		}
	}
}
