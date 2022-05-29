document.querySelector("#acceptCookies").addEventListener('click', () => {
	chrome.storage.local.remove("optOutCookies");
	chrome.storage.local.set({install: Date.now()}, () => {
		chrome.runtime.sendMessage({
			type: "restart",
		});
		setTimeout(window.close, 10)
	});
	return false;
});

document.querySelector("#declineCookies").addEventListener('click', () => {
	chrome.storage.local.remove("install");
	chrome.storage.local.set({optOutCookies: Date.now()}, () => {
		window.close();
	});
	return false;
});