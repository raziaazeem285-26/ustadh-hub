/* Razia Azeem Official — site script (blog) */
(function () {
  "use strict";

  function $(id) { return document.getElementById(id); }

  /* ---------- mobile menu (hamburger) ---------- */
  var toggle = $("navToggle"), nav = $("siteNav");
  function closeMenu() {
    if (!nav) return;
    nav.classList.remove("open");
    document.body.classList.remove("menu-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }
  if (toggle && nav) {
    /* dimmed backdrop (created once via JS so no HTML edits are needed on any page);
       tapping it closes the menu */
    var backdrop = document.createElement("div");
    backdrop.className = "nav-backdrop";
    backdrop.setAttribute("aria-hidden", "true");
    document.body.appendChild(backdrop);
    backdrop.addEventListener("click", closeMenu);
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      document.body.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
    var nc = $("navClose");
    if (nc) nc.addEventListener("click", closeMenu);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------- categories dropdown (tap to expand, works on touch) ---------- */
  document.querySelectorAll(".drop-btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var wrap = btn.parentElement;
      var open = wrap.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });
  document.addEventListener("click", function (e) {
    document.querySelectorAll(".has-drop.open").forEach(function (wrap) {
      if (!wrap.contains(e.target)) {
        wrap.classList.remove("open");
        var b = wrap.querySelector(".drop-btn");
        if (b) b.setAttribute("aria-expanded", "false");
      }
    });
  });

  /* ---------- active nav link highlighting ---------- */
  (function () {
    var path = window.location.pathname;
    var page = path.split("/").pop() || "index.html";
    var map = { home: false, blog: false, categories: false, about: false };
    if (page === "" || page === "index.html") map.home = true;
    else if (page === "blog.html" || path.indexOf("/posts/") > -1) map.blog = true;
    else if (path.indexOf("/categories/") > -1) map.categories = true;
    else if (page === "about.html") map.about = true;
    document.querySelectorAll("[data-nav]").forEach(function (el) {
      var n = el.getAttribute("data-nav");
      if (map[n]) el.classList.add("active");
    });
  })();

  /* ---------- contact form (opens the visitor's email app) ---------- */
  var form = $("contactForm");
  if (form) form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = $("contactName").value.trim(),
        email = $("contactEmail").value.trim(),
        msg = $("contactMsg").value.trim();
    var href = "mailto:raziaazeem285@gmail.com?subject=" +
      encodeURIComponent("Razia Azeem Official contact from " + name) +
      "&body=" + encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\n" + msg);
    window.location.href = href;
    $("contactStatus").textContent = "Opening your email app — just press send to reach us.";
  });

  /* ---------- reading progress bar (post pages) ---------- */
  var rpBar = $("rpBar");
  function updateProgress() {
    if (!rpBar) return;
    var h = document.documentElement;
    var m = h.scrollHeight - h.clientHeight;
    var p = m > 0 ? h.scrollTop / m : 0;
    rpBar.style.width = (p * 100) + "%";
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  /* ---------- back-to-top button ---------- */
  var toTop = $("toTop");
  function toggleTop() {
    if (toTop) toTop.classList.toggle("show", window.scrollY > 600);
  }
  window.addEventListener("scroll", toggleTop, { passive: true });
  toggleTop();
  if (toTop) toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- chatbot widget loader (loads chatbot.js + chatbot.css) ----------
     Every page loads app.js, so the assistant appears on all pages automatically —
     including future auto-blog posts. Paths resolve relative to app.js itself,
     so posts/ and categories/ pages work without edits. */
  (function () {
    try {
      var src = (document.currentScript && document.currentScript.src) || "";
      var base = src.slice(0, src.lastIndexOf("/") + 1);
      var l = document.createElement("link");
      l.rel = "stylesheet"; l.href = base + "chatbot.css";
      document.head.appendChild(l);
      var s = document.createElement("script");
      s.src = base + "chatbot.js"; s.async = false;
      document.head.appendChild(s);
    } catch (e) { /* chatbot is optional — never break the page */ }
  })();

  /* ---------- admission lead form (index.html #leadForm → WhatsApp) ---------- */
  var leadForm = $("leadForm");
  if (leadForm) leadForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = $("leadName").value.trim(),
        phone = $("leadPhone").value.trim(),
        interest = $("leadInterest").value,
        msg = $("leadMsg").value.trim(),
        ageEl = $("leadAge"),
        age = ageEl ? ageEl.value.trim() : "";
    var text = "Assalam-o-Alaikum! Website admission inquiry:\n" +
      "Name: " + name + "\nWhatsApp: " + phone +
      (age ? "\nChild's age: " + age : "") +
      "\nInterested in: " + interest +
      (msg ? "\nMessage: " + msg : "");
    window.open("https://wa.me/923440325566?text=" + encodeURIComponent(text), "_blank");
    $("leadStatus").textContent = "Opening WhatsApp — just press Send. Thank you!";
    leadForm.reset();
  });

  /* ---------- scroll reveal (light CSS animation, no libraries) ---------- */
  var els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && els.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add("in"); });
  }
})();

/* ============ v2 — search, related posts, comments, newsletter ============ */
(function () {
  "use strict";

  /* ---------- site config (Razia: 2-minute setup notes in chat) ---------- */
  var CONFIG = {
    // Giscus comments: set true AFTER enabling Discussions on the repo + installing the giscus app.
    GISCUS_ENABLED: false,
    GISCUS_REPO: "raziaazeem285-26/ustadh-hub",
    GISCUS_REPO_ID: "R_kgDOVJT4SQ",
    GISCUS_CATEGORY: "General",
    GISCUS_CATEGORY_ID: "", // fill after Discussions is enabled (see chat)
    // Newsletter (Buttondown, free): set your Buttondown username after creating a free account.
    NEWSLETTER_USER: ""
  };

  function appBase() {
    try {
      var src = (document.currentScript && document.currentScript.src) || "";
      return src.slice(0, src.lastIndexOf("/") + 1);
    } catch (e) { return ""; }
  }
  var BASE = appBase();

  function fetchPosts() {
    return fetch(BASE + "posts.json", { cache: "no-store" })
      .then(function (r) { return r.ok ? r.json() : []; })
      .catch(function () { return []; });
  }

  /* ---------- staggered reveal: cards rise one after another ---------- */
  try {
    document.querySelectorAll(".blog-grid, .cat-tiles, .social-grid").forEach(function (grid) {
      var kids = grid.querySelectorAll(":scope > *");
      kids.forEach(function (k, i) {
        if (!k.style.getPropertyValue("--d")) k.style.setProperty("--d", ((i % 4) * 0.09) + "s");
      });
    });
  } catch (e) { /* stagger is decorative */ }

  /* ---------- blog search (blog.html) ---------- */
  var searchInput = document.getElementById("blogSearch");
  if (searchInput) {
    var grid = document.querySelector(".blog-grid");
    var meta = document.getElementById("searchMeta");
    var clearBtn = document.getElementById("searchClear");
    var cards = grid ? Array.prototype.slice.call(grid.querySelectorAll(".card")) : [];
    var noRes = document.createElement("div");
    noRes.className = "no-results";
    noRes.innerHTML = '<span class="big">🔍</span><h3>Nothing found</h3><p>Try different words — e.g. "dua", "quran", "sabr".</p>';
    function runSearch() {
      var q = searchInput.value.trim().toLowerCase();
      var n = 0;
      cards.forEach(function (c) {
        var hit = !q || c.textContent.toLowerCase().indexOf(q) > -1;
        c.style.display = hit ? "" : "none";
        if (hit) n++;
      });
      if (clearBtn) clearBtn.classList.toggle("show", !!q);
      if (n === 0 && q) { grid.appendChild(noRes); }
      else if (noRes.parentNode) { noRes.parentNode.removeChild(noRes); }
      if (meta) meta.innerHTML = q ? ("<strong>" + n + "</strong> nateeja — “" + searchInput.value.trim().replace(/</g, "&lt;") + "”") : "";
    }
    searchInput.addEventListener("input", runSearch);
    if (clearBtn) clearBtn.addEventListener("click", function () {
      searchInput.value = ""; runSearch(); searchInput.focus();
    });
  }

  /* ---------- related posts + comments (auto on every article page) ---------- */
  var article = document.querySelector("article.article");
  if (article) {
    var slug = (location.pathname.split("/").pop() || "").replace(/\.html$/, "");
    fetchPosts().then(function (posts) {
      var me = null, others = [];
      posts.forEach(function (p) { (p.slug === slug ? (me = p) : others.push(p)); });
      var rel = [];
      if (me) {
        others.forEach(function (p) { if (p.category_slug === me.category_slug) rel.push(p); });
        others.forEach(function (p) { if (p.category_slug !== me.category_slug && rel.indexOf(p) < 0) rel.push(p); });
      } else { rel = others.slice(); }
      rel = rel.slice(0, 3);

      var sec = document.createElement("section");
      sec.className = "related-sec wrap reveal";
      var html = "<h2>Related articles</h2><p>Mazeed parhen — isi mauzu par aur articles:</p><div class=\"related-grid\">";
      rel.forEach(function (p, i) {
        var href = p.url.indexOf("posts/") === 0 ? "../" + p.url : p.url;
        var catHref = "../categories/" + p.category_slug + ".html";
        var art = p.image
          ? "<div class=\"card-art\"><img src=\"" + p.image + "\" alt=\"" + p.title.replace(/"/g, "") + "\" loading=\"lazy\"></div>"
          : "<a class=\"post-band\" href=\"" + catHref + "\"><span>" + p.category + "</span></a>";
        html += "<article class=\"post-card\" style=\"--d:" + (i * 0.09) + "s\">" +
          art +
          "<div class=\"post-body\"><div class=\"post-meta\">" + p.date + " · " + p.read_time + "</div>" +
          "<h3><a href=\"" + href + "\">" + p.title + "</a></h3><p>" + p.excerpt + "</p>" +
          "<a class=\"read-more\" href=\"" + href + "\">Read article</a></div></article>";
      });
      html += "</div>";
      sec.innerHTML = html;
      article.parentNode.insertBefore(sec, article.nextSibling);

      /* comments */
      var csec = document.createElement("section");
      csec.className = "comments-sec wrap reveal";
      if (CONFIG.GISCUS_ENABLED && CONFIG.GISCUS_CATEGORY_ID) {
        csec.innerHTML = "<h2>Comments</h2><p>Share your thoughts — questions or suggestions are welcome!</p><div class=\"giscus-wrap\" id=\"giscusWrap\"></div>";
        article.parentNode.insertBefore(csec, sec.nextSibling);
        var g = document.createElement("script");
        g.src = "https://giscus.app/client.js";
        g.setAttribute("data-repo", CONFIG.GISCUS_REPO);
        g.setAttribute("data-repo-id", CONFIG.GISCUS_REPO_ID);
        g.setAttribute("data-category", CONFIG.GISCUS_CATEGORY);
        g.setAttribute("data-category-id", CONFIG.GISCUS_CATEGORY_ID);
        g.setAttribute("data-mapping", "pathname");
        g.setAttribute("data-strict", "0");
        g.setAttribute("data-reactions-enabled", "1");
        g.setAttribute("data-emit-metadata", "0");
        g.setAttribute("data-input-position", "top");
        g.setAttribute("data-theme", "light");
        g.setAttribute("data-lang", "en");
        g.crossOrigin = "anonymous";
        g.async = true;
        document.getElementById("giscusWrap").appendChild(g);
      } else {
        csec.innerHTML = "<h2>Comments</h2><p>Share your thoughts — questions or suggestions are welcome!</p>" +
          "<div class=\"giscus-wrap\"><div class=\"giscus-soon\"><span class=\"big\">💬</span>" +
          "<p><strong>Comments coming soon!</strong><br>Until then, ask the chatbot or message us on WhatsApp.</p></div></div>";
        article.parentNode.insertBefore(csec, sec.nextSibling);
      }

      /* re-run reveal observer for injected nodes */
      try {
        var io2 = new IntersectionObserver(function (es) {
          es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io2.unobserve(en.target); } });
        }, { threshold: 0.12 });
        sec.querySelectorAll(".reveal").forEach(function (el) { io2.observe(el); });
        io2.observe(csec);
      } catch (e) { sec.classList.add("in"); csec.classList.add("in"); }
    });
  }

  /* ---------- newsletter (Buttondown, free) ---------- */
  var newsForm = document.getElementById("newsForm");
  if (newsForm) {
    newsForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = document.getElementById("newsEmail").value.trim();
      var status = document.getElementById("newsStatus");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.textContent = "Please enter a valid email, then press subscribe.";
        return;
      }
      if (!CONFIG.NEWSLETTER_USER) {
        status.innerHTML = "Newsletter launching soon! Until then, get <a href=\"https://wa.me/923440325566?text=Assalamu%20Alaikum!%20I%20want%20daily%20Islamic%20reminders.\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--gold-soft)\">daily reminders on WhatsApp</a>.";
        return;
      }
      status.textContent = "Subscribing…";
      fetch("https://buttondown.com/api/emails/embed-subscribe/" + encodeURIComponent(CONFIG.NEWSLETTER_USER), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email })
      }).then(function (r) {
        if (r.ok) {
          status.textContent = "🎉 Thank you! You're subscribed — your first reminder is on its way.";
          newsForm.reset();
        } else { throw new Error("bad"); }
      }).catch(function () {
        status.textContent = "Something went wrong — please try again or contact us on WhatsApp.";
      });
    });
  }
})();
