
chrome.browserAction.onClicked.addListener(function(tab) {
  console.log("begin background stuff");
    chrome.history.search({text: '', maxResults: 10}, function(data) {
        data.forEach(function(page) {
            //send message to backend....

            /*$.post(url + 'history1',
            data );*/

/*
        // Make a simple request:
        chrome.runtime.sendMessage(activeTab.id,  {openUrlInEditor: url},
          function(response) {
            console.log("yuh?")
            if (!response.success)
              handleError(url);
          });*/

            // Send a message to the active tab
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                var activeTab = tabs[0];
                chrome.tabs.sendMessage(activeTab.id, {"message": page});
            });
console.log(JSON.stringify({
    value: page
}));            const yourUrl = "http://localhost:5000/api/postHistory";

            var xhr = new XMLHttpRequest();
        xhr.open("POST", yourUrl, true);
        xhr.setRequestHeader('Content-Type', 'application/JSON');
        JSON.stringify({
            value: page
        });
        });
    });
});
