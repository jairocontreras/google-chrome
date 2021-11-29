const array = ["color", "images", "people", "related", "snippets", "videos", "visited"];
document.addEventListener("DOMContentLoaded", function() {
  chrome.storage.sync.get(array, function(items) {
    if (!document.URL.includes("search?tbm") && !document.URL.includes("&tbm")) {
      var images, people, snippet, videos;
      document.querySelectorAll(".ULSxyf").forEach(function(elem) {
        const h2 = elem.querySelector("h2"),
              h3 = elem.querySelector("h3");
        if (h2) {
          if (h2.textContent == "Featured snippet from the web")
            snippet = elem;
        }
        else if (h3) {
          if (h3.textContent.includes("Images for"))
            images = elem;
          else if (h3.textContent == "Videos")
            videos = elem;
          else if (h3.textContent == "People also ask")
            people = elem;
        }
      });
      if (items["images"] && images)
        images.style.display = "none";
      if (items["people"] && people)
        people.style.display = "none";
      if (items["related"])
        document.getElementById("botstuff").style.display = "none";
      if (items["snippets"] && snippet)
        snippet.style.display = "none";
      if (items["videos"] && videos)
        videos.style.display = "none";
      if (items["visited"])
        window.document.styleSheets[0].insertRule("#rcnt a:visited {color:" + items["color"] + "}");
    }
    document.getElementById("rcnt").style.visibility = "visible";
  });
});