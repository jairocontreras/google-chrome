chrome.runtime.onInstalled.addListener(details => {
  if (details.reason === "install")
    chrome.tabs.create({url: "main.html"});
  chrome.contextMenus.create({
    "id": "id",
    "title": "Set as desktop background",
    "contexts": ["image"]
  });
});

chrome.contextMenus.onClicked.addListener(info => {
  const message = {url: info.srcUrl};
  var icon = "error";
  chrome.runtime.sendNativeMessage("set_as_desktop_background", message, response => {
    const lasterror = chrome.runtime.lastError;
    // specified native messaging host not found
    if (lasterror)
      response = lasterror.message.slice(0, -1);
    else if (response) {
      if (response === "<urlopen error [Errno 11001] getaddrinfo failed>") {
        icon = "warning";
        response = "No internet connection";
      }
      else if (response === "HTTP Error 403: Forbidden")
        response = "Cannot fetch file using web scraper";
    }
    else {
      chrome.storage.local.set(message);
      return;
    }
    notify(icon, response);
  });
});

function notify(icon, error) {
  chrome.notifications.create({
    iconUrl: "/images/" + icon + ".png",
    message: error,
    title: "Something went wrong",
    type: "basic"
  });
}