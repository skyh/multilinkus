var SelectorPlugin = require('mtl/ui/SelectorPlugin');


var selector = new SelectorPlugin();
selector.attach(document);

selector.onselectstart = function () {
	if (!chrome.runtime) {
		selector.detach();
		return;
	}

	try {
		chrome.runtime.sendMessage({
			action: 'ping'
		});
	} catch (e) {
		selector.detach();
	}
};

selector.onselected = function (links) {
	try {
		chrome.runtime.sendMessage({
			action: 'openLinks',
			args: [links]
		});
	} catch (e) {
		selector.detach();
	}
};
