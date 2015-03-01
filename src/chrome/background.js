var api = require('core/api');
var uniq = require('uniq');


var actions = {
	openLinks: function (sender, links) {
		var linksForOpening = uniq(links);
		
		console.log(sender);

		linksForOpening.forEach(function (link) {
			chrome.tabs.create({
				url: link,
				active: false,
				openerTabId: sender.tab.id
			});
		});

		return Promise.accept(null);
	},
	
	undefined: function () {
		return Promise.reject('no action');
	}
};


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	var action = String(message.action);
	var args = message.args || [];
	
	args.unshift(sender);

	actions[action].apply(actions, args)
		.then(sendResponse)
		.catch(sendResponse);
});
