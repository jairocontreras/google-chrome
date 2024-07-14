document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  if (window.navigator.onLine) {
    chrome.storage.local.get(["url"]).then(result => {
      const url = result["url"];
      if (url)
        chrome.downloads.download({url: url}).then(id => body.textContent = id ? "Saved!" : "Failed");
      else
        body.textContent = "Save most recent wallpaper";
    });
  }
  else
    body.textContent = "No internet connection";
});