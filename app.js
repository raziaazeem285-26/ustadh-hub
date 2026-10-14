(function () {
  "use strict";

  /* ---------- tutor data for profile modal ---------- */
  var TUTORS = {
    ayesha: {
      name: "Ayesha Khan", rating: "★ 4.9 (84 reviews)", role: "Mathematics · O/A Levels",
      img: "assets/tutor-ayesha.webp", fee: "Rs 1,800 / hour", experience: "6 years",
      mode: "Online + Home tuition", languages: "English, Urdu", subject: "mathematics",
      bio: "Concept-first lessons with weekly progress notes and past-paper practice. Ayesha breaks every topic into small, testable steps and tracks each student's progress week by week, so parents always know exactly where their child stands."
    },
    hamza: {
      name: "Hamza Qureshi", rating: "★ 4.8 (61 reviews)", role: "Physics · FSc / A Levels",
      img: "assets/tutor-hamza.webp", fee: "Rs 2,200 / hour", experience: "8 years",
      mode: "Online", languages: "English, Urdu", subject: "physics",
      bio: "Visual explanations, derivation drills and focused exam preparation. Hamza teaches physics the way it clicks — diagrams first, formulas second — and runs timed past-paper drills before every board exam season."
    },
    sana: {
      name: "Sana Malik", rating: "★ 4.9 (47 reviews)", role: "English · Spoken & IELTS",
      img: "assets/tutor-sana.webp", fee: "Rs 1,500 / hour", experience: "5 years",
      mode: "Online + Home tuition", languages: "English, Urdu", subject: "english",
      bio: "Practical speaking sessions with personal feedback and confidence building. Sana's lessons are 80% speaking practice — real conversations, instant corrections, and a personal vocabulary plan after every session."
    }
  };

  /* ---------- filters + search ---------- */
  var cards = [].slice.call(document.querySelectorAll(".tutor-card"));
  var empty = document.getElementById("emptyState");
  var currentMode = "all", currentSubject = "";
  function applyFilters() {
    var shown = 0;
    cards.forEach(function (card) {
      var modeOk = currentMode === "all" || card.dataset.mode.indexOf(currentMode) > -1;
      var subjectOk = !currentSubject || card.dataset.subject.indexOf(currentSubject) > -1;
      var yes = modeOk && subjectOk;
      card.style.display = yes ? "block" : "none";
      if (yes) shown++;
    });
    empty.style.display = shown ? "none" : "block";
    document.getElementById("resultLabel").textContent = currentSubject
      ? ("Showing matches for " + currentSubject + ".")
      : "Profiles selected for strong teaching signals and learner fit.";
  }
  document.querySelectorAll(".pill").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".pill").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      currentMode = btn.dataset.filter;
      applyFilters();
    });
  });
  document.querySelectorAll(".subject").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".subject").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      currentSubject = btn.dataset.subject;
      document.getElementById("subjectInput").value = btn.querySelector("strong").textContent;
      applyFilters();
      document.getElementById("tutors").scrollIntoView({ behavior: "smooth" });
    });
  });
  document.getElementById("heroSearch").addEventListener("submit", function (e) {
    e.preventDefault();
    currentSubject = document.getElementById("subjectInput").value.trim().toLowerCase();
    currentMode = document.getElementById("modeInput").value;
    document.querySelectorAll(".pill").forEach(function (b) { b.classList.toggle("active", b.dataset.filter === currentMode); });
    applyFilters();
    document.getElementById("tutors").scrollIntoView({ behavior: "smooth" });
  });

  /* ---------- ustadh compass ---------- */
  ["budget", "exam", "flex"].forEach(function (id) {
    var input = document.getElementById(id), out = document.getElementById(id + "Out");
    input.addEventListener("input", function () { out.textContent = input.value + "%"; });
  });
  document.getElementById("matchBtn").addEventListener("click", function () {
    var b = +document.getElementById("budget").value,
        e = +document.getElementById("exam").value,
        f = +document.getElementById("flex").value;
    var scores = [
      { name: "Ayesha Khan", v: 0.35 * b + 0.40 * e + 0.25 * f },
      { name: "Hamza Qureshi", v: 0.20 * b + 0.55 * e + 0.25 * f },
      { name: "Sana Malik", v: 0.40 * b + 0.20 * e + 0.40 * f }
    ].sort(function (a, z) { return z.v - a.v; });
    var result = document.getElementById("matchResult");
    result.innerHTML = "<strong>" + scores[0].name + "</strong> is your closest match at <strong>" +
      Math.round(scores[0].v) + "%</strong> based on these priorities.";
    result.classList.add("show");
  });

  /* ---------- generic modal helpers ---------- */
  function wireModal(backdropId, closeId) {
    var modal = document.getElementById(backdropId);
    function close() { modal.classList.remove("open"); }
    document.getElementById(closeId).addEventListener("click", close);
    modal.addEventListener("click", function (e) { if (e.target === modal) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    return { open: function () { modal.classList.add("open"); }, close: close, el: modal };
  }

  /* ---------- tutor profile modal ---------- */
  var profile = wireModal("profileModal", "closeProfile");
  document.getElementById("profileClose2").addEventListener("click", profile.close);
  var currentProfileKey = null;
  document.querySelectorAll(".view").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var t = TUTORS[btn.dataset.profile];
      if (!t) return;
      currentProfileKey = btn.dataset.profile;
      document.getElementById("profileContent").innerHTML =
        '<div class="profile-hero"><img src="' + t.img + '" alt="Portrait of ' + t.name + '" />' +
        "<div><h3>" + t.name + "</h3><div class='role'>" + t.role + "</div>" +
        "<div class='rating'><b>" + t.rating + "</b></div></div></div>" +
        "<dl class='profile-details'>" +
        "<div><dt>Starting fee</dt><dd>" + t.fee + "</dd></div>" +
        "<div><dt>Experience</dt><dd>" + t.experience + "</dd></div>" +
        "<div><dt>Teaching mode</dt><dd>" + t.mode + "</dd></div>" +
        "<div><dt>Languages</dt><dd>" + t.languages + "</dd></div></dl>" +
        "<p class='profile-bio'>" + t.bio + "</p>";
      profile.open();
    });
  });
  var draft = wireModal("draftModal", "closeModal");
  document.querySelectorAll("[data-open-draft]").forEach(function (b) {
    b.addEventListener("click", function () { draft.open(); document.getElementById("draftSubject").focus(); });
  });
  document.getElementById("profileRequest").addEventListener("click", function () {
    profile.close();
    if (currentProfileKey) {
      document.getElementById("draftSubject").value = TUTORS[currentProfileKey].subject;
      document.getElementById("draftStatus").textContent =
        "Interested in " + TUTORS[currentProfileKey].name + "? Create a requirement brief to compare the fit.";
    }
    draft.open();
  });

  function draftText() {
    return ["LEARNING REQUIREMENT",
      "Subject: " + (document.getElementById("draftSubject").value || "Not specified"),
      "Class / level: " + (document.getElementById("draftLevel").value || "Not specified"),
      "Preferred mode: " + document.getElementById("draftMode").value,
      "Budget: " + (document.getElementById("draftBudget").value || "Open to discuss"),
      "Goal: " + (document.getElementById("draftGoal").value || "Not specified")].join("\n");
  }
  document.getElementById("downloadDraft").addEventListener("click", function () {
    var blob = new Blob([draftText()], { type: "text/plain" }),
        url = URL.createObjectURL(blob), a = document.createElement("a");
    a.href = url; a.download = "learning-requirement.txt"; a.click();
    URL.revokeObjectURL(url);
    document.getElementById("draftStatus").textContent = "Brief downloaded.";
  });
  document.getElementById("copyDraft").addEventListener("click", function () {
    navigator.clipboard.writeText(draftText()).then(function () {
      document.getElementById("draftStatus").textContent = "Brief copied to clipboard.";
    }, function () {
      document.getElementById("draftStatus").textContent = "Copy unavailable — please use Download brief.";
    });
  });

  /* ---------- tutor profile builder modal ---------- */
  var tutorModal = wireModal("tutorModal", "closeTutor");
  document.querySelectorAll("[data-open-tutor]").forEach(function (b) {
    b.addEventListener("click", function () { tutorModal.open(); document.getElementById("tutorName").focus(); });
  });
  function tutorText() {
    return ["TUTOR PROFILE DRAFT",
      "Name: " + (document.getElementById("tutorName").value || "Not specified"),
      "Main subject: " + (document.getElementById("tutorSubject").value || "Not specified"),
      "Experience: " + (document.getElementById("tutorExperience").value || "Not specified"),
      "Teaching mode: " + document.getElementById("tutorMode").value,
      "Starting fee: " + (document.getElementById("tutorFee").value || "Open to discuss"),
      "Languages: " + (document.getElementById("tutorLanguages").value || "Not specified"),
      "Teaching approach: " + (document.getElementById("tutorBio").value || "Not specified")].join("\n");
  }
  document.getElementById("downloadTutor").addEventListener("click", function () {
    var blob = new Blob([tutorText()], { type: "text/plain" }),
        url = URL.createObjectURL(blob), a = document.createElement("a");
    a.href = url; a.download = "tutor-profile-draft.txt"; a.click();
    URL.revokeObjectURL(url);
    document.getElementById("tutorStatus").textContent = "Profile draft downloaded.";
  });
  document.getElementById("copyTutor").addEventListener("click", function () {
    navigator.clipboard.writeText(tutorText()).then(function () {
      document.getElementById("tutorStatus").textContent = "Profile draft copied to clipboard.";
    }, function () {
      document.getElementById("tutorStatus").textContent = "Copy unavailable — please use Download profile draft.";
    });
  });

  /* ---------- contact form ---------- */
  document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("contactName").value.trim(),
        email = document.getElementById("contactEmail").value.trim(),
        msg = document.getElementById("contactMsg").value.trim();
    var href = "mailto:hello@ustadhhub.com?subject=" +
      encodeURIComponent("UstadhHub contact from " + name) +
      "&body=" + encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\n" + msg);
    window.location.href = href;
    document.getElementById("contactStatus").textContent =
      "Opening your email app — just press send to reach us.";
  });
})();
