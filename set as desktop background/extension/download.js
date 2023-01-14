document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("script").addEventListener("click", function() {
    chrome.downloads.download({url: "chrome-extension://" + chrome.runtime.id + "/Script Installer.exe"});
  });
});