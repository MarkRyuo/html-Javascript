chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "getBlockedCount") {
    // Retrieve blocked count from storage and send it to the popup
    chrome.storage.local.get("blockedCount", function(data) {
      sendResponse({ blockedCount: data.blockedCount || 0 });
    });
    return true; // Keeps the message channel open for sendResponse
  }
});

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    // Increment blocked count and store it in local storage
    chrome.storage.local.get("blockedCount", function(data) {
      var count = data.blockedCount || 0;
      count++;
      chrome.storage.local.set({ "blockedCount": count });
    });
    return { cancel: true };
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);
