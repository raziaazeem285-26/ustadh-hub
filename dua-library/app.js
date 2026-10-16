/* ============ Dua Library app ============ */
(function () {
  "use strict";

  var CATS = [
    { slug: "all", label: "Sab Duas" },
    { slug: "fav", label: "❤️ Pasandeeda" },
    { slug: "quran", label: "Quranic Duas" },
    { slug: "morning", label: "Subah & Sham" },
    { slug: "forgiveness", label: "Maghfirat" },
    { slug: "protection", label: "Hifazat" },
    { slug: "rizq", label: "Rizq & Hajat" },
    { slug: "hardship", label: "Mushkil Waqt" }
  ];

  var grid = document.getElementById("duaGrid"),
      meta = document.getElementById("duaMeta"),
      empty = document.getElementById("duaEmpty"),
      search = document.getElementById("duaSearch"),
      clearBtn = document.getElementById("duaClear"),
      chipsBox = document.getElementById("catChips"),
      countEl = document.getElementById("duaCount");

  var duas = [], cat = "all", q = "";
  var favs = {};
  try { favs = JSON.parse(localStorage.getItem("duaFavs") || "{}"); } catch (e) { favs = {}; }
  function saveFavs() { try { localStorage.setItem("duaFavs", JSON.stringify(favs)); } catch (e) {} }

  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function catCount(slug) {
    if (slug === "all") return duas.length;
    if (slug === "fav") return Object.keys(favs).filter(function (k) { return favs[k]; }).length;
    return duas.filter(function (d) { return d.categories.indexOf(slug) > -1; }).length;
  }

  function renderChips() {
    chipsBox.innerHTML = CATS.map(function (c) {
      return '<button class="chip' + (cat === c.slug ? " active" : "") + '" data-cat="' + c.slug + '" role="tab" aria-selected="' + (cat === c.slug) + '">' +
        esc(c.label) + '<span class="n">' + catCount(c.slug) + "</span></button>";
    }).join("");
    chipsBox.querySelectorAll(".chip").forEach(function (b) {
      b.addEventListener("click", function () { cat = b.getAttribute("data-cat"); renderChips(); render(); });
    });
  }

  function matches(d) {
    if (cat === "fav" && !favs[d.id]) return false;
    if (cat !== "all" && cat !== "fav" && d.categories.indexOf(cat) < 0) return false;
    if (q) {
      var hay = (d.title + " " + d.arabic + " " + d.transliteration + " " + d.urdu + " " + d.reference + " " + d.virtue).toLowerCase();
      if (hay.indexOf(q) < 0) return false;
    }
    return true;
  }

  function card(d, i) {
    var isFav = !!favs[d.id];
    return '<article class="dua-card" style="--d:' + Math.min(i * 0.05, 0.4) + 's" data-id="' + esc(d.id) + '">' +
      '<div class="dua-top"><h3 class="dua-title">' + esc(d.title) + "</h3>" +
      '<span class="ref-badge ' + esc(d.reference_type) + '">' + (d.reference_type === "quran" ? "☪ Quran" : "✦ Hadith") + "</span></div>" +
      '<p class="dua-arabic" dir="rtl" lang="ar">' + esc(d.arabic) + "</p>" +
      '<p class="dua-translit">' + esc(d.transliteration) + "</p>" +
      '<p class="dua-urdu" dir="rtl" lang="ur">' + esc(d.urdu) + "</p>" +
      '<div class="dua-virtue">✨ <strong>Fazilat:</strong> ' + esc(d.virtue) + "</div>" +
      '<div class="dua-ref">📖 ' + esc(d.reference) + "</div>" +
      '<div class="dua-actions">' +
      '<button class="btn-copy" data-copy="' + esc(d.id) + '">📋 Copy dua</button>' +
      '<button class="btn-fav' + (isFav ? " on" : "") + '" data-fav="' + esc(d.id) + '" aria-label="Favourite" aria-pressed="' + isFav + '">' + (isFav ? "❤️" : "🤍") + "</button>" +
      "</div></article>";
  }

  function render() {
    var list = duas.filter(matches);
    grid.innerHTML = list.map(card).join("");
    empty.hidden = list.length > 0;
    grid.style.display = list.length ? "" : "none";
    var bits = [];
    if (q) bits.push('"' + "<strong>" + esc(search.value.trim()) + "</strong>" + '" ke liye');
    if (cat !== "all") bits.push("category: <strong>" + esc(CATS.filter(function (c) { return c.slug === cat; })[0].label.replace("❤️ ", "")) + "</strong>");
    meta.innerHTML = list.length + " duas mili" + (bits.length ? " — " + bits.join(", ") : "");
    countEl.textContent = duas.length;
    wire();
  }

  function wire() {
    grid.querySelectorAll("[data-copy]").forEach(function (b) {
      b.addEventListener("click", function () {
        var d = duas.filter(function (x) { return x.id === b.getAttribute("data-copy"); })[0];
        if (!d) return;
        var text = d.title + "\n\n" + d.arabic + "\n\n" + d.transliteration + "\n\n" + d.urdu + "\n\n— " + d.reference + " (Dua Library, Razia Azeem Official)";
        function done() { b.textContent = "✅ Copied!"; b.classList.add("done"); setTimeout(function () { b.innerHTML = "📋 Copy dua"; b.classList.remove("done"); }, 1600); }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, function () { fallback(); });
        } else { fallback(); }
        function fallback() {
          var t = document.createElement("textarea");
          t.value = text; document.body.appendChild(t); t.select();
          try { document.execCommand("copy"); done(); } catch (e) {}
          document.body.removeChild(t);
        }
      });
    });
    grid.querySelectorAll("[data-fav]").forEach(function (b) {
      b.addEventListener("click", function () {
        var id = b.getAttribute("data-fav");
        if (favs[id]) delete favs[id]; else favs[id] = 1;
        saveFavs(); renderChips(); render();
      });
    });
  }

  search.addEventListener("input", function () {
    q = search.value.trim().toLowerCase();
    clearBtn.classList.toggle("show", !!q);
    render();
  });
  clearBtn.addEventListener("click", function () { search.value = ""; q = ""; clearBtn.classList.remove("show"); render(); search.focus(); });

  fetch("duas.json", { cache: "no-store" })
    .then(function (r) { return r.json(); })
    .then(function (data) { duas = data || []; renderChips(); render(); })
    .catch(function () {
      empty.hidden = false; grid.style.display = "none";
      empty.querySelector("p").textContent = "Couldn't load duas — please refresh the page.";
    });
})();
