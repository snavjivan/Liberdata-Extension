
chrome.browserAction.onClicked.addListener(function(tab) {
  console.log("begin background stuff");
    chrome.history.search({text: '', maxResults: 10}, function(data) {
        data.forEach(function(page) {
            //send message to backend....
            const url = "http://localhost:3000";
            const data = {"message": page};
            /*$.post(url + 'history1',
            data );*/

            // Send a message to the active tab
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                var activeTab = tabs[0];
                chrome.tabs.sendMessage(activeTab.id, {"message": page});
            });
        });
    });
});
