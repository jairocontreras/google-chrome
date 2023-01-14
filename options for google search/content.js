const options = ["color", "images", "people", "related", "snippet", "stories", "videos", "visited"];
function hide(elem) {
  elem.style.display = "none";
}
document.addEventListener("DOMContentLoaded", function() {
  chrome.storage.sync.get(options, function(items) {
    if (!document.querySelector(".XqFnDf")) {
      var images, people, related, snippet, stories, videos;
      document.querySelectorAll(".ULSxyf").forEach(function(elem) {
        const heading = elem.querySelector("[role=heading]");
        if (elem.textContent.substring(0,29) == "Featured snippet from the web")
          snippet = elem;
        else if (heading) {
          if (heading.textContent == "Top stories")
            stories = elem;
          else if (heading.textContent.substring(0,10) == "Images for")
            images = elem;
          else if (heading.textContent == "Videos")
            videos = elem;
          else if (heading.textContent == "People also ask" && !people) // first iteration only
            people = elem;
          else if (heading.textContent == "Related searches")
            related = elem;
        }
      });
      if (items["snippet"] && snippet)
        hide(snippet);
      if (items["stories"] && stories)
        hide(stories);
      if (items["images"] && images)
        hide(images);
      if (items["videos"] && videos)
        hide(videos);
      if (items["people"] && people)
        hide(people);
      if (items["related"] && related)
        hide(document.getElementById("bres"));
    }
    if (items["visited"])
      window.document.styleSheets[0].insertRule("#rcnt a:visited {color:" + items["color"] + "}");
    document.getElementById("rcnt").style.visibility = "visible";
  });
});