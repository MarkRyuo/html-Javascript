// Background script (background.js)
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    console.log("Blocking request to: " + details.url);
    return { cancel: true };
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);