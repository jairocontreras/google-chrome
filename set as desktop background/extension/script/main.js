chrome.runtime.sendNativeMessage("set_as_desktop_background", {url: ""}, response => {
  const lasterror = chrome.runtime.lastError,
        hidden = document.querySelector(".hidden"),
        heading = document.getElementById("heading"),
        install = document.getElementById("install");
  if (!lasterror) {
    hidden.classList.add("animate");
    heading.textContent = "Congrats!";
    install.textContent = "The following components are already installed:";
    document.querySelectorAll(".button").forEach(elem => {elem.classList.add("installed")});
  }
  hidden.classList.remove("hidden");
});