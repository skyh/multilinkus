var SelectorPlugin = require('mtl/ui/SelectorPlugin');


var selector = new SelectorPlugin();
selector.attach(document);

selector.onselected = function (links) {
	chrome.runtime.sendMessage({
		action: 'openLinks',
		args: [links]
	});
};
