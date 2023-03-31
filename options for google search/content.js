document.addEventListener("DOMContentLoaded", function() {
  chrome.storage.local.get(["color"]).then((saved) => {
    window.document.styleSheets[0].insertRule("#rcnt a:visited {color:" + saved.color + "}");
  });
});