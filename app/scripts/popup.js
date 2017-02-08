'use strict';

console.log('\'Allo \'Allo! Popup');

function automate() {
	chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
		var activeTab = tabs[0];
		chrome.tabs.sendMessage(activeTab.id, {'message': 'automate', 'data': document.getElementById('text').value});
	});
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('button').addEventListener('click', automate);
});