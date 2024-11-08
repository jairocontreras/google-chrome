chrome.runtime.onInstalled.addListener(details => {
  if (details.reason === "install") {
    chrome.runtime.sendNativeMessage("set_as_desktop_background", {url: ""}, response => {
      const lasterror = chrome.runtime.lastError;
      // specified native messaging host not found
      if (lasterror)
        chrome.tabs.create({url: "main.html"});
    });
  }
  chrome.contextMenus.create({
    "id": "id",
    "title": "Set as desktop background",
    "contexts": ["image"]
  });
});

chrome.contextMenus.onClicked.addListener(info => {
  const message = {url: info.srcUrl};
  chrome.runtime.sendNativeMessage("set_as_desktop_background", message, response => {
    const lasterror = chrome.runtime.lastError;
    if (lasterror)
      response = lasterror.message.slice(0, -1);
    else if (response) {
      const error = response.toLowerCase();
      // errno 11001
      if (error.includes("getaddrinfo failed"))
        response = "No internet connection";
      // http error 403
      else if (error.includes("forbidden"))
        response = "Cannot fetch file using web scraper (blocked by server)";
      // unable to get local issuer certificate
      else if (error.includes("certificate verify failed"))
        response = "SSL certificate verification error";
    }
    else {
      chrome.storage.local.set(message);
      return;
    }
    notify(response);
  });
});

function notify(error) {
  chrome.notifications.create({
    iconUrl: "/images/error.png",
    message: error,
    title: "Something went wrong",
    type: "basic"
  });
}