const content = document.getElementById("content");
document.getElementById("details").addEventListener("click", function() {
  content.style.height = (content.offsetHeight == 0 ? content.scrollHeight : 0);
  this.classList.toggle("collapse");
});