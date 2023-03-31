const color = document.querySelector("input"),
      example = document.querySelector("a"),
      save = document.querySelector("button");

chrome.storage.local.get(["color"]).then((saved) => {
  if (Object.entries(saved).length) {
    color.value = saved.color;
    example.style.color = saved.color;
  }
  else {
    example.style.color = color.value;
    chrome.storage.local.set({"color" : color.value});
  }
});

color.addEventListener("input", function() {
  save.innerText = "Save";
  const style = new Option().style;
  style.color = this.value;
  this.setCustomValidity(style.color ? "" : "arbitrary");
  if (this.validity.valid) {
    example.style.color = this.value;
    chrome.storage.local.get(["color"]).then((saved) => {
      save.disabled = (this.value == saved.color) ? true : false;
    });
  }
  else
    save.disabled = true;
});

save.addEventListener("click", function() {
  chrome.storage.local.set({"color" : color.value});
  this.innerText = "Saved!";
  this.disabled = true;
});