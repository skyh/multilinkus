var api = require('mtl/core/api');


var actions = {
	openLinks: function (sender, links) {
		var linksForOpening = api.filterLinks(links);

		linksForOpening.forEach(function (link) {
			chrome.tabs.create({
				url: link,
				active: false,
				openerTabId: sender.tab.id
			});
		});
	}
};


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	var action = String(message.action);
	var args = message.args || [];

	args.unshift(sender);

	actions[action].apply(actions, args);
});
