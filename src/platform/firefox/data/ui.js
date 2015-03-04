var SelectorPlugin = require('mtl/ui/SelectorPlugin');

var port = self.port;

var selector = new SelectorPlugin();
selector.attach(document);

selector.onselected = function (links) {
	port.emit('openLinks', links);
};
