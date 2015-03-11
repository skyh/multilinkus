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


chrome.runtime.onInstalled.addListener(function (details) {
	var reason = details.reason;

	if (reason === 'install') {
		injectContentScriptsInAllMatchedTabs();
	}
});


function injectContentScriptsInAllMatchedTabs() {
	var manifest = chrome.runtime.getManifest();
	var contentScripts = manifest['content_scripts'];

	if (contentScripts && contentScripts.length > 0) {
		for (var i = 0, l = contentScripts.length; i < l; ++i) {
			var contentScript = contentScripts[i];
			injectContentScript(contentScript);
		}
	}
}


function injectContentScript(script) {
	var query = {url: script.matches};

	chrome.tabs.query(query, function (tabs) {
		for (var i = tabs.length; i--;) {
			var tab = tabs[i];

			var scriptFiles = script.js;
			var currentFile = 0;

			(function next() {
				var file = scriptFiles[currentFile++];

				if (!file) {
					return;
				}

				var executeOptions = {
					file: file
				};

				chrome.tabs.executeScript(tab.id, executeOptions, function (results) {
					next();
				});
			}());
		}
	});
}
