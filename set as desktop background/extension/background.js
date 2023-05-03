chrome.runtime.onInstalled.addListener(details => {
  if (details.reason == "install")
    chrome.tabs.create({url: "main.html"});
  else if (details.reason == "update") {
    chrome.notifications.create({
      buttons: [{title: "Download"}],
      iconUrl: "60.png",
      message: "Update available for the script",
      title: "Set as desktop background",
      type: "basic"
    });
  }
  chrome.contextMenus.create({
    "id": "id",
    "title": "Set as desktop background",
    "contexts": ["image"]
  });
});

chrome.notifications.onButtonClicked.addListener(() => {
  chrome.tabs.create({url: "https://bit.ly/3AM8By8"});
});

chrome.contextMenus.onClicked.addListener(info => {
  chrome.runtime.sendNativeMessage("set_as_desktop_background", {url: info.srcUrl}, response => {
    if (response) {
      chrome.notifications.create({
        iconUrl: "error.png",
        message: response,
        title: "Failed to download file",
        type: "basic"
      });
    }
  });
});