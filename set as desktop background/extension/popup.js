window.addEventListener("load", () => {
  const span = document.querySelector("span");
  chrome.storage.local.get(["url"]).then(result => {
    const url = result["url"];
    if (url) {
      span.textContent = "Saving...";
      chrome.downloads.download({url: url}).then(id => {
        console.log(id);
        if (id) {
          if (window.navigator.onLine)
            span.textContent += " Success!";
          else
            span.textContent += " Offline";
        }
        else
          span.textContent += " Failed";
      });
    }
    else
      span.textContent = "Save most recent wallpaper to your computer...\nYou must use the extension first from the context menu";
  });
});