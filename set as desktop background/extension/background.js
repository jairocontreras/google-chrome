chrome.runtime.onInstalled.addListener(details => {
  if (details.reason == "install")
    chrome.tabs.create({url:"main.html"});
  chrome.contextMenus.create({
    "id": "id",
    "title": "Set as desktop background",
    "contexts": ["image"]
  });
});

chrome.contextMenus.onClicked.addListener(info => {
  chrome.runtime.sendNativeMessage("set.as.desktop.background", {url: info.srcUrl});
});