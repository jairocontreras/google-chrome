chrome.runtime.onInstalled.addListener(details => {
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

chrome.contextMenus.onClicked.addListener(info => {
  chrome.runtime.sendNativeMessage("set_as_desktop_background", {url: info.srcUrl});
});