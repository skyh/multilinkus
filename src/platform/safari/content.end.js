require('js/Math.sign');
var SelectorPlugin = require('mtl/ui/SelectorPlugin');


var selector = new SelectorPlugin();
selector.attach(document);

selector.onselected = function (links) {
	safari.self.tab.dispatchMessage('openLinks', links);
};
