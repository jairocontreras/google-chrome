chrome.runtime.onInstalled.addListener(details => {
  if (details.reason == "install")
    chrome.tabs.create({url: "main.html"});
  else if (details.reason == "update")
    reminder("true", "Remind me later");
  chrome.contextMenus.create({
    "id": "id",
    "title": "Set as desktop background",
    "contexts": ["image"]
  });
});

chrome.notifications.onButtonClicked.addListener((id, index) => {
  if (index == 0)
    chrome.downloads.download({url: "https://bit.ly/3AM8By8"});
  else
    chrome.storage.local.set({reminder: (id === "true")});
});

chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get(["reminder"]).then(result => {
    if (result["reminder"])
      reminder("false", "Turn off reminder");
  });
});

chrome.contextMenus.onClicked.addListener(info => {
  chrome.runtime.sendNativeMessage("set_as_desktop_background", {url: info.srcUrl}, response => {
    const lasterror = chrome.runtime.lastError;
    if (lasterror)
      error(lasterror.message.slice(0, -1));
    else if (response)
      error(response);
    else
      chrome.storage.local.set({url: info.srcUrl});
  });
});

function reminder(id, action) {
  chrome.notifications.create(id, {
    buttons: [{title: "Download"}, {title: action}],
    iconUrl: "60.png",
    message: "Feature update available for the script",
    requireInteraction: true,
    title: "Set as desktop background",
    type: "basic"
  });
}

function error(message) {
  chrome.notifications.create({
    iconUrl: "error.png",
    message: message,
    title: "Error",
    type: "basic"
  });
}