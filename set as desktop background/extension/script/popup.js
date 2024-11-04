document.addEventListener("DOMContentLoaded", () => {
  const span = document.querySelector("span");
  var url;
  chrome.storage.local.get(["url"]).then(result => {
    url = result["url"];
    if (url) {
      const n = url.lastIndexOf("/"),
            filename = url.substring(n+1).split("?")[0];
      span.textContent = filename;
      span.classList.add("url");
      if (filename.length > 101)
        span.classList.add("long");
    }
    else
      span.textContent = "None";
  });
  span.addEventListener("click", () => {
    if (span.classList.contains("url"))
      chrome.downloads.download({url: url});
  });
});