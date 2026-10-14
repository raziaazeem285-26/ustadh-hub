/* Razia Azeem Official — site script (blog-only) */
(function () {
  "use strict";

  function $(id) { return document.getElementById(id); }

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
