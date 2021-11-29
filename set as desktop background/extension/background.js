function notify(message, id = "") {
  chrome.notifications.create(id, {
    "type": "basic",
    "iconUrl": "48.png",
    "title": "Set as desktop background",
    "message": message,
    "requireInteraction": true
  });
}

chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason == "install")
    notify("Please install required software. See web store page for details", "install");
  /*else if (details.reason == "update" && details.previousVersion < 1.0)
    notify("Please update Python script");*/
  chrome.contextMenus.create({
    "id": "id",
    "title": "Set as desktop background",
    "contexts": ["image"]
  });
});

chrome.contextMenus.onClicked.addListener(function(info) {
  chrome.runtime.sendNativeMessage("set_as_desktop_background", {url: info.srcUrl});
});