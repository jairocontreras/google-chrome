document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  if (window.navigator.onLine) {
    chrome.storage.local.get(["url"]).then(result => {
      const url = result["url"];
      if (url) {
        chrome.downloads.download({url: url}).then(id => {
          if (id)
            body.textContent = "Saved!";
          else
            body.textContent = "Failed";
        });
      }
      else
        body.textContent = "Save most recent wallpaper to your computer:\nYou must use the extension first from the context menu";
    });
  }
  else
    body.textContent = "No internet connection";
});