window.addEventListener("load", function() {
  const hidden = document.getElementById("hidden");
  document.getElementById("details").addEventListener("click", function() {
    this.classList.toggle("collapse");
    hidden.style.height = (hidden.offsetHeight == 0 ? hidden.scrollHeight + "px" : 0);
  });
});