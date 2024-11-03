document.addEventListener("DOMContentLoaded", () => {
  const span = document.querySelector("span");
  var url;
  chrome.storage.local.get(["url"]).then(result => {
    url = result["url"];
    if (url) {
      const n = url.lastIndexOf("/");
      span.textContent = url.substring(n+1);
      span.classList.add("url");
    }
    else
      span.textContent = "None";
  });
  span.addEventListener("click", () => {
    if (span.classList.contains("url"))
      chrome.downloads.download({url: url});
  });
});