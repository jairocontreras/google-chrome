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

chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get(["reminder"]).then(result => {
    if (result["reminder"])
      reminder("false", "Turn off reminder");
  });
});

chrome.contextMenus.onClicked.addListener(info => {
  const message = {url: info.srcUrl};
  chrome.runtime.sendNativeMessage("set_as_desktop_background", message, response => {
    const lasterror = chrome.runtime.lastError;
    if (lasterror)
      error(lasterror.message.slice(0, -1));
    else if (response)
      error(response);
    else
      chrome.storage.local.set(message);
  });
});

chrome.notifications.onButtonClicked.addListener((id, index) => {
  if (index == 0)
    chrome.downloads.download({url: "https://bit.ly/3NJlMrh"});
  else
    chrome.storage.local.set({reminder: (id === "true")});
});

function error(message) {
  chrome.notifications.create({
    iconUrl: "/images/error.png",
    message: message,
    title: "Something went wrong",
    type: "basic"
  });
}

function reminder(id, action) {
  chrome.notifications.create(id, {
    buttons: [{title: "Download"}, {title: action}],
    iconUrl: "/images/60.png",
    message: "Script update available",
    requireInteraction: true,
    title: "Set as desktop background",
    type: "basic"
  });
}