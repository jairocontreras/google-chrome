const content = document.getElementById("content");
document.getElementById("details").addEventListener("click", function() {
  this.classList.toggle("collapse");
  content.style.height = (content.offsetHeight == 0 ? content.scrollHeight : 0);
});