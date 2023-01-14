chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason == "install")
    chrome.tabs.create({url:"main.html"});
  else if (details.reason == "update")
    chrome.tabs.create({url:"update.html"});
  chrome.contextMenus.create({
    "id": "id",
    "title": "Set as desktop background",
    "contexts": ["image"]
  });
});

chrome.contextMenus.onClicked.addListener(function(info) {
  chrome.runtime.sendNativeMessage("set.as.desktop.background", {url: info.srcUrl});
});