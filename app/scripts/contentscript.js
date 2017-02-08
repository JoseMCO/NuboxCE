'use strict';

console.log('\'Allo \'Allo! Content script');

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if( request.message === 'automate' ) {
			fillFields(request.data);
		}
	}
);

function fillFields(data){
	alert(data);
}