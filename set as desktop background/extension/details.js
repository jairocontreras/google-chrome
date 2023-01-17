document.getElementById("details").addEventListener("click", function(e) {
  const div = e.target.parentElement.nextElementSibling;
  div.style.setProperty("--show", div.scrollHeight + "px");
  div.classList.toggle("show");
  div.classList.toggle("hide");
});