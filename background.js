
chrome.browserAction.onClicked.addListener(function(tab) {
  console.log("begin background stuff");
  searches = ["- google search", "facebook.com", "reddit.com", "twitter.com", "youtube.com", ""];

  for (var search of searches) {
    chrome.history.search({text: search, maxResults: 300}, function(data) {
        pages = [];
        data.forEach(function(page) {
            pages.push(page);
        });
        //send message to backend....
        const yourUrl = "http://localhost:5000/user-api/postHistory";

        var xhr = new XMLHttpRequest();
        xhr.open("POST", yourUrl, true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify({
            value: pages
        }));

        // Send a message to the active tab
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {"message": pages});
        });
    });
  }
});
