'use strict';

console.log('\'Allo \'Allo! Popup');

function automate() {
	chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
		var activeTab = tabs[0];
		chrome.tabs.sendMessage(activeTab.id, {'message': 'automate', 'data': document.getElementById('text').value});
	});
}
function comp_aux() {
	chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
		var activeTab = tabs[0];
		chrome.tabs.sendMessage(activeTab.id, {'message': 'comp_aux', 'data': document.getElementById('comp_aux_val').value});
		window.close();
	});
}
function comp_aux2() {
	chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
		var activeTab = tabs[0];
		chrome.tabs.sendMessage(activeTab.id, {'message': 'comp_aux2', 'data': document.getElementById('comp_aux_val').value});
		window.close();
	});
}
function comp_in() {
	chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
		var activeTab = tabs[0];
		chrome.tabs.sendMessage(activeTab.id, {'message': 'comp_in', 'data': document.getElementById('comp_val').value});
		window.close();
	});
}
function comp_out() {
	chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
		var activeTab = tabs[0];
		chrome.tabs.sendMessage(activeTab.id, {'message': 'comp_out', 'data': document.getElementById('comp_val').value});
		window.close();
	});
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('button').addEventListener('click', automate);
  document.getElementById('comp_aux_button2').addEventListener('click', comp_aux2);
  document.getElementById('comp_aux_button').addEventListener('click', comp_aux);
  document.getElementById('comp_in_button').addEventListener('click', comp_in);
  document.getElementById('comp_out_button').addEventListener('click', comp_out);
});