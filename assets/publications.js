// Filters for the publications page.
// It reads the topics written on each paper, so you never need to edit
// this file: add papers and topics in _data/publications.yml instead.
(function () {
  var list = document.getElementById("pub-list");
  var tools = document.getElementById("pub-tools");
  if (!list || !tools) return;

  var chipBox = document.getElementById("pub-chips");
  var search = document.getElementById("pub-search");
  var firstOnly = document.getElementById("pub-first");
  var countText = document.getElementById("pub-count");
  var emptyText = document.getElementById("pub-empty");

  var items = Array.prototype.slice.call(list.querySelectorAll(".pub"));
  var groups = Array.prototype.slice.call(list.querySelectorAll(".pub-group"));

  // Count how many papers carry each topic
  var topicCounts = {};
  items.forEach(function (el) {
    el._topics = (el.getAttribute("data-topics") || "")
      .split("|")
      .map(function (t) { return t.trim(); })
      .filter(Boolean);
    el._text = el.textContent.toLowerCase();
    el._topics.forEach(function (t) {
      topicCounts[t] = (topicCounts[t] || 0) + 1;
    });
  });

  // Most common topics first
  var topics = Object.keys(topicCounts).sort(function (a, b) {
    return topicCounts[b] - topicCounts[a] || a.localeCompare(b);
  });

  var activeTopic = "";

  function makeChip(label, value, count) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "chip";
    b.setAttribute("data-topic", value);
    b.setAttribute("aria-pressed", value === activeTopic ? "true" : "false");
    b.appendChild(document.createTextNode(label));
    var c = document.createElement("span");
    c.className = "chip-count";
    c.textContent = count;
    b.appendChild(c);
    b.addEventListener("click", function () {
      activeTopic = value;
      Array.prototype.forEach.call(chipBox.children, function (chip) {
        chip.setAttribute("aria-pressed", chip.getAttribute("data-topic") === activeTopic ? "true" : "false");
      });
      update();
    });
    return b;
  }

  chipBox.appendChild(makeChip("All", "", items.length));
  topics.forEach(function (t) {
    chipBox.appendChild(makeChip(t, t, topicCounts[t]));
  });

  function update() {
    var query = search.value.trim().toLowerCase();
    var wantFirst = firstOnly.checked;
    var shown = 0;

    items.forEach(function (el) {
      var ok = true;
      if (activeTopic && el._topics.indexOf(activeTopic) === -1) ok = false;
      if (wantFirst && el.getAttribute("data-first") !== "1") ok = false;
      if (query && el._text.indexOf(query) === -1) ok = false;
      el.hidden = !ok;
      if (ok) shown++;
    });

    // Hide a year heading when none of its papers are showing
    groups.forEach(function (g) {
      g.hidden = !g.querySelector(".pub:not([hidden])");
    });

    countText.textContent = "Showing " + shown + " of " + items.length;
    emptyText.hidden = shown !== 0;
  }

  search.addEventListener("input", update);
  firstOnly.addEventListener("change", update);

  tools.hidden = false;
  update();
})();
