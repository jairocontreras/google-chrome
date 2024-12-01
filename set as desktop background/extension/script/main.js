chrome.runtime.sendNativeMessage("set_as_desktop_background", {url: ""}, response => {
  const lasterror = chrome.runtime.lastError,
        status = document.getElementById("status"),
        heading = document.getElementById("heading"),
        install = document.getElementById("install");
  if (!lasterror) {
    status.classList.add("animate");
    heading.textContent = "Congrats!";
    install.textContent = "The following components are already installed:";
    document.querySelectorAll(".button").forEach(elem => {elem.classList.add("installed")});
  }
  status.classList.remove("hidden");
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("clear").addEventListener("click", () => {
    chrome.storage.local.clear();
    document.getElementById("done").classList.remove("hidden");
  });
});