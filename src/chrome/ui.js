var	Selection = require('ui/Selection'),
	Point = require('ui/Point'),
	Matcher = require('ui/Matcher'),
	Highlighter = require('ui/Highlighter');


var VK_ALT = 18,
	VK_ESC = 27;

var html = document.documentElement;

var selection = null,
	overlay = null;


html.addEventListener('mousedown', onGlobalMouseDown, true);


function onGlobalMouseDown(event) {
	if (!event.altKey) {
		return;
	}

	event.preventDefault();
	event.stopPropagation();

	startSelection(Point.fromEventClientXY(event));
}

function onGlobalMouseUp(event) {
	event.preventDefault();
	event.stopPropagation();

	doneSelection();
}

function onGlobalKeyUp(event) {
	if (event.keyCode === VK_ALT) {
		cancelSelection();
	}
}

function onGlobalKeyDown(event) {
	// if (event.keyCode === VK_ESC) {
	// 	endSelection();
	// }
}

function createOverlay() {
	var overlay = document.createElement('div');
	var style = overlay.style;

	style.position = 'fixed';
	style.display = 'block';
	style.top = 0;
	style.right = 0;
	style.bottom = 0;
	style.left = 0;
	style.cursor = 'crosshair';
	style.zIndex = 16777271;

	return overlay;
}

function getOverlay() {
	if (!overlay) {
		overlay = createOverlay();
	}

	return overlay;
}

function showOverlay() {
	var overlay = getOverlay();
	html.appendChild(overlay);
}

function hideOverlay() {
	var overlay = getOverlay();

	if (overlay.parentNode) {
		overlay.parentNode.removeChild(overlay);
	}
}

function startSelection(startPoint) {
	html.addEventListener('mouseup', onGlobalMouseUp, true);
	html.addEventListener('keydown', onGlobalKeyDown, true);
	html.addEventListener('keyup', onGlobalKeyUp, true);

	showOverlay();

	selection = new Selection(overlay, new Matcher(overlay), new Highlighter(overlay));
	selection.start(startPoint);
}

function cancelSelection() {
	endSelection();
}

function doneSelection() {
	var selectedLinks = selection.getSelectedLinks();
	endSelection();

	chrome.runtime.sendMessage({
		action: "openLinks",
		args: [
			selectedLinks
		]
	});
}

function endSelection() {
	html.removeEventListener('mouseup', onGlobalMouseUp, true);
	html.removeEventListener('keydown', onGlobalKeyDown, true);
	html.removeEventListener('keyup', onGlobalKeyUp, true);

	selection.end();
	hideOverlay();

	selection.release();
}
