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
