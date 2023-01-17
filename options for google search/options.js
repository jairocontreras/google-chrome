const color = document.getElementById("color"),
      div = document.querySelector("div"),
      example = document.querySelector("a"),
      save = document.querySelector("button"),
      span = document.querySelector("span"),
      visited = document.getElementById("visited");

var current = {},
    item_color,
    options = [];

function compare() {
  chrome.storage.sync.get(_default, function(saved) {
    update_current(); // allow synchronous functions to execute first
    if (JSON.stringify(current) != JSON.stringify(saved) && color.validity.valid) {
      save.disabled = false;
      span.classList.add("hide");
    }
    else
      save.disabled = true;
  });
}

function update_current() {
  options.forEach(function(item) {
    const elem = document.getElementById(item),
          attr = (elem.type == "checkbox" ? "checked" : "value");
    current[item] = elem[attr];
  });
}

document.querySelectorAll("input").forEach(function(elem) {
  options.push(elem.id);
});

options.sort();
update_current();
const _default = Object.assign({}, current);

// restore options
chrome.storage.sync.get(options, function(items) {
  if (Object.entries(items).length) {
    item_color = items["color"];
    options.forEach(function(item) {
      const elem = document.getElementById(item),
            attr = (elem.type == "checkbox" ? "checked" : "value");
      elem[attr] = items[item];
    });
    example.style.color = items["color"];
    if (items["visited"])
      visited.dispatchEvent(new Event("change"));
  }
  else
    item_color = color.value;
});

options.forEach(function(item) {
  const elem = document.getElementById(item),
        ev = (elem.type == "checkbox" ? "change" : "input");
  elem.addEventListener(ev, compare);
});

visited.addEventListener("change", function() {
  if (visited.checked)
    div.style.visibility = "";
  else {
    div.style.visibility = "hidden";
    // reset color
    color.value = item_color;
    example.style.color = color.value;
    color.setCustomValidity("");
  }
});

color.addEventListener("input", function() {
  const style = new Option().style;
  var str;
  style.color = this.value;
  if (style.color) {
    str = "";
    example.style.color = this.value;
  }
  else
    str = "arbitrary";
  this.setCustomValidity(str);
});

save.addEventListener("click", function() {
  save.disabled = true;
  update_current();
  item_color = current["color"];
  chrome.storage.sync.set(current);
  span.classList.remove("hide");
});