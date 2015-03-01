var api = require('mtl/core/api');


safari.application.addEventListener('message', function (messageEvent) {
	if (messageEvent.name === 'openLinks') {
		var links = api.filterLinks(messageEvent.message);
		var w = messageEvent.target.browserWindow;

		links.forEach(function (link) {
			w.openTab('background').url = link;
		});
	}
}, false);
