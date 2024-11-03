chrome.runtime.sendNativeMessage("set_as_desktop_background", {url: ""}, response => {
  const lasterror = chrome.runtime.lastError,
        hidden = document.querySelector(".hidden"),
        title = document.getElementById("title"),
        comp = document.getElementById("comp");
  if (!lasterror) {
    hidden.classList.add("animate");
    title.textContent = "Congrats!";
    comp.textContent = "The following components are already installed:";
    document.querySelectorAll(".button").forEach(elem => {elem.classList.add("installed")});
  }
  hidden.classList.remove("hidden");
});