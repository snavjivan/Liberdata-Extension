chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.history.search({text: '', maxResults: 10}, function(data) {
        data.forEach(function(page) {
            // Send a message to the active tab
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                var activeTab = tabs[0];
                chrome.tabs.sendMessage(activeTab.id, {"message": page});
            });
        });
    });
});