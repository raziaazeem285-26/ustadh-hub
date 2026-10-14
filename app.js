(function () {
  "use strict";

  function $(id) { return document.getElementById(id); }

  /* ---------- avatar SVGs (golden/navy) ---------- */
  function avatarSVG(initials, gradId, c1, c2, label, cls) {
    return '<svg class="' + (cls || "avatar") + '" viewBox="0 0 100 100" role="img" aria-label="' + label + '">' +
      '<defs><linearGradient id="' + gradId + '" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="' + c1 + '"/><stop offset="1" stop-color="' + c2 + '"/></linearGradient></defs>' +
      '<rect width="100" height="100" fill="url(#' + gradId + ')"/>' +
      '<text x="50" y="63" text-anchor="middle" font-size="32" fill="#ffffff" font-weight="700" font-family="Poppins,sans-serif">' +
      initials + "</text></svg>";
  }

  /* ---------- tutor data for profile modal ---------- */
  var TUTORS = {
    ayesha: {
      name: "Ayesha Khan", rating: "★ 4.9 (84 reviews)", role: "Mathematics · O/A Levels",
      initials: "AK", grad: "g-ayesha", c1: "#0E2242", c2: "#D4AF37",
      fee: "Rs 1,800 / hour", experience: "6 years",
      mode: "Online + Home tuition", languages: "English, Urdu", subject: "mathematics",
      bio: "Concept-first lessons with weekly progress notes and past-paper practice. Ayesha breaks every topic into small, testable steps and tracks each student's progress week by week, so parents always know exactly where their child stands."
    },
    hamza: {
      name: "Hamza Qureshi", rating: "★ 4.8 (61 reviews)", role: "Physics · FSc / A Levels",
      initials: "HQ", grad: "g-hamza", c1: "#0A1A33", c2: "#C9A227",
      fee: "Rs 2,200 / hour", experience: "8 years",
      mode: "Online", languages: "English, Urdu", subject: "physics",
      bio: "Visual explanations, derivation drills and focused exam preparation. Hamza teaches physics the way it clicks — diagrams first, formulas second — and runs timed past-paper drills before every board exam season."
    },
    sana: {
      name: "Sana Malik", rating: "★ 4.9 (47 reviews)", role: "English · Spoken & IELTS",
      initials: "SM", grad: "g-sana", c1: "#14294d", c2: "#E9CF7A",
      fee: "Rs 1,500 / hour", experience: "5 years",
      mode: "Online + Home tuition", languages: "English, Urdu", subject: "english",
      bio: "Practical speaking sessions with personal feedback and confidence building. Sana's lessons are 80% speaking practice — real conversations, instant corrections, and a personal vocabulary plan after every session."
    }
  };

  /* ---------- filters + search ---------- */
  var cards = [].slice.call(document.querySelectorAll(".tutor-card"));
  var empty = $("emptyState");
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
    if (empty) empty.style.display = shown ? "none" : "block";
    var label = $("resultLabel");
    if (label) label.textContent = currentSubject
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
      $("subjectInput").value = btn.querySelector("strong").textContent;
      applyFilters();
      $("tutors").scrollIntoView({ behavior: "smooth" });
    });
  });
  var heroSearch = $("heroSearch");
  if (heroSearch) heroSearch.addEventListener("submit", function (e) {
    e.preventDefault();
    currentSubject = $("subjectInput").value.trim().toLowerCase();
    currentMode = $("modeInput").value;
    document.querySelectorAll(".pill").forEach(function (b) { b.classList.toggle("active", b.dataset.filter === currentMode); });
    applyFilters();
    $("tutors").scrollIntoView({ behavior: "smooth" });
  });

  /* ---------- ustadh compass ---------- */
  ["budget", "exam", "flex"].forEach(function (id) {
    var input = $(id); if (!input) return;
    var out = $(id + "Out");
    input.addEventListener("input", function () { out.textContent = input.value + "%"; });
  });
  var matchBtn = $("matchBtn");
  if (matchBtn) matchBtn.addEventListener("click", function () {
    var b = +$("budget").value, e = +$("exam").value, f = +$("flex").value;
    var scores = [
      { name: "Ayesha Khan", v: 0.35 * b + 0.40 * e + 0.25 * f },
      { name: "Hamza Qureshi", v: 0.20 * b + 0.55 * e + 0.25 * f },
      { name: "Sana Malik", v: 0.40 * b + 0.20 * e + 0.40 * f }
    ].sort(function (a, z) { return z.v - a.v; });
    var result = $("matchResult");
    result.innerHTML = "<strong>" + scores[0].name + "</strong> is your closest match at <strong>" +
      Math.round(scores[0].v) + "%</strong> based on these priorities.";
    result.classList.add("show");
  });

  /* ---------- fee calculator ---------- */
  var feeHours = $("feeHours");
  if (feeHours) feeHours.addEventListener("input", function () { $("feeHoursOut").textContent = feeHours.value; });
  var feeBtn = $("feeBtn");
  if (feeBtn) feeBtn.addEventListener("click", function () {
    var sel = $("feeSubject");
    var rate = +sel.value, subject = sel.options[sel.selectedIndex].text.split(" — ")[0];
    var mode = $("feeMode"), mult = +mode.value, modeName = mode.options[mode.selectedIndex].text;
    var hours = +$("feeHours").value;
    var weekly = Math.round(rate * mult * hours);
    var monthly = weekly * 4;
    $("feeResult").innerHTML =
      "<strong>" + subject + "</strong> · " + modeName + " · " + hours + " hrs/week" +
      '<div class="big-fee">Rs ' + monthly.toLocaleString("en-PK") + " / month</div>" +
      "About Rs " + weekly.toLocaleString("en-PK") + " per week. Final fee is agreed directly with your tutor — many offer trial discounts.";
    $("feeResult").classList.add("show");
  });

  /* ---------- study planner ---------- */
  var planHours = $("planHours");
  if (planHours) planHours.addEventListener("input", function () { $("planHoursOut").textContent = planHours.value; });
  var planBtn = $("planBtn");
  if (planBtn) planBtn.addEventListener("click", function () {
    var subs = [].map.call(document.querySelectorAll("#planSubjects input:checked"), function (c) { return c.value; }).slice(0, 4);
    var goal = $("planGoal").value, hours = +$("planHours").value;
    var result = $("planResult");
    if (!subs.length) { result.innerHTML = "Please select at least one subject."; result.classList.add("show"); return; }
    var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    var focus = {
      exam: "Past-paper practice",
      concepts: "Concept building",
      revision: "Quick revision"
    }[goal];
    var html = "<strong>Your 7-day plan</strong> — " + hours + " hrs/day · focus: " + focus + ".";
    html += '<table class="plan-table"><tr><th>Day</th><th>Plan</th></tr>';
    days.forEach(function (d, i) {
      var task;
      if (d === "Sunday") {
        task = "Weekly review: revise weak topics from " + subs.join(", ") + ", then rest.";
      } else {
        var s1 = subs[i % subs.length], s2 = subs[(i + 1) % subs.length];
        task = s1 + " (" + focus.toLowerCase() + ") + " + (s1 === s2 ? "practice set" : s2 + " (light revision)");
      }
      html += "<tr><td><strong>" + d + "</strong></td><td>" + task + "</td></tr>";
    });
    html += "</table><p style='margin-top:10px;font-size:13px'>Tip: keep your phone away during study blocks, and end each day with a 10-minute recap.</p>";
    result.innerHTML = html;
    result.classList.add("show");
  });

  /* ---------- chatbot ---------- */
  var chatFab = $("chatFab"), chatPanel = $("chatPanel"), chatBody = $("chatBody"),
      chatForm = $("chatForm"), chatText = $("chatText"), chatQuick = $("chatQuick");
  var QUICK = ["Find a tutor", "What are the fees?", "Online vs home?", "Contact us"];
  function addMsg(text, who) {
    var d = document.createElement("div");
    d.className = "chat-msg " + who;
    d.innerHTML = text;
    chatBody.appendChild(d);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
  function botReply(q) {
    var t = q.toLowerCase();
    if (/(salam|hello|hi|hey|aoa)\b/.test(t) && t.length < 20)
      return "Hello! Welcome to UstadhHub. Ask me about finding a tutor, fees, online vs home tuition, or contacting us.";
    if (/fee|price|cost|charges|kitna|paisa/.test(t))
      return "Tutor fees depend on subject, experience and mode. Starting rates are roughly <strong>Rs 1,200–2,500/hour</strong>. Try our <a href='#tools'>Fee Calculator</a> for an exact monthly estimate.";
    if (/online.*home|home.*online|which.*better|compare/.test(t))
      return "Both work well! <strong>Online</strong> is flexible and usually cheaper; <strong>home tuition</strong> gives in-person attention. Read our full guide: <a href='posts/online-vs-home-tuition.html'>Online vs Home Tuition</a>.";
    if (/find|search|tutor|teacher|ustadh/.test(t))
      return "Type your subject in the <a href='#top'>search box</a> or tap a subject card, then filter by Online or Home. Open any profile to compare fees, ratings and teaching style — then request a demo lesson.";
    if (/demo|trial/.test(t))
      return "Yes! Open a tutor's profile and click <strong>Request a demo lesson</strong>. We recommend a demo before committing to any tutor.";
    if (/join|become|teach|tutor banna|apply/.test(t))
      return "Tutors can join free! Click <strong>Become a tutor</strong> at the top and build your profile with subjects, fee and schedule.";
    if (/contact|phone|whatsapp|email|number|call/.test(t))
      return "You can reach us at <strong>hello@ustadhhub.com</strong> or <strong>+92 300 000 0000</strong> (phone/WhatsApp). We reply within one working day.";
    if (/blog|article|guide|tips/.test(t))
      return "Check our <a href='blog.html'>blog</a> — guides on choosing tutors, online vs home tuition, and scoring higher in online classes.";
    if (/thank|shukriya/.test(t))
      return "You're welcome! Good luck with your studies.";
    if (/bye|allah hafiz/.test(t))
      return "Allah Hafiz! Come back anytime you need help finding a tutor.";
    return "I can help with: <strong>finding a tutor</strong>, <strong>fees</strong>, <strong>online vs home tuition</strong>, or <strong>contact details</strong>. What would you like to know?";
  }
  function renderQuick() {
    chatQuick.innerHTML = "";
    QUICK.forEach(function (q) {
      var b = document.createElement("button");
      b.type = "button"; b.textContent = q;
      b.addEventListener("click", function () { addMsg(q, "user"); addMsg(botReply(q), "bot"); });
      chatQuick.appendChild(b);
    });
  }
  if (chatFab) {
    renderQuick();
    chatFab.addEventListener("click", function () {
      var open = chatPanel.classList.toggle("open");
      if (open && !chatBody.children.length) {
        addMsg("Assalam-o-Alaikum! I'm the UstadhHub assistant. How can I help you today?", "bot");
      }
    });
    $("chatClose").addEventListener("click", function () { chatPanel.classList.remove("open"); });
    chatForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var q = chatText.value.trim();
      if (!q) return;
      addMsg(q.replace(/</g, "&lt;"), "user");
      chatText.value = "";
      setTimeout(function () { addMsg(botReply(q), "bot"); }, 350);
    });
  }

  /* ---------- generic modal helpers ---------- */
  function wireModal(backdropId, closeId) {
    var modal = $(backdropId);
    function close() { modal.classList.remove("open"); }
    $(closeId).addEventListener("click", close);
    modal.addEventListener("click", function (e) { if (e.target === modal) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    return { open: function () { modal.classList.add("open"); }, close: close, el: modal };
  }

  /* ---------- tutor profile modal ---------- */
  var profile = wireModal("profileModal", "closeProfile");
  $("profileClose2").addEventListener("click", profile.close);
  var currentProfileKey = null;
  document.querySelectorAll(".view").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var t = TUTORS[btn.dataset.profile];
      if (!t) return;
      currentProfileKey = btn.dataset.profile;
      $("profileContent").innerHTML =
        '<div class="profile-hero">' +
        avatarSVG(t.initials, t.grad + "-m", t.c1, t.c2, "Portrait of " + t.name, "avatar-sm") +
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
    b.addEventListener("click", function () { draft.open(); $("draftSubject").focus(); });
  });
  $("profileRequest").addEventListener("click", function () {
    profile.close();
    if (currentProfileKey) {
      $("draftSubject").value = TUTORS[currentProfileKey].subject;
      $("draftStatus").textContent =
        "Interested in " + TUTORS[currentProfileKey].name + "? Create a requirement brief to compare the fit.";
    }
    draft.open();
  });

  function draftText() {
    return ["LEARNING REQUIREMENT",
      "Subject: " + ($("draftSubject").value || "Not specified"),
      "Class / level: " + ($("draftLevel").value || "Not specified"),
      "Preferred mode: " + $("draftMode").value,
      "Budget: " + ($("draftBudget").value || "Open to discuss"),
      "Goal: " + ($("draftGoal").value || "Not specified")].join("\n");
  }
  $("downloadDraft").addEventListener("click", function () {
    var blob = new Blob([draftText()], { type: "text/plain" }),
        url = URL.createObjectURL(blob), a = document.createElement("a");
    a.href = url; a.download = "learning-requirement.txt"; a.click();
    URL.revokeObjectURL(url);
    $("draftStatus").textContent = "Brief downloaded.";
  });
  $("copyDraft").addEventListener("click", function () {
    navigator.clipboard.writeText(draftText()).then(function () {
      $("draftStatus").textContent = "Brief copied to clipboard.";
    }, function () {
      $("draftStatus").textContent = "Copy unavailable — please use Download brief.";
    });
  });

  /* ---------- tutor profile builder modal ---------- */
  var tutorModal = wireModal("tutorModal", "closeTutor");
  document.querySelectorAll("[data-open-tutor]").forEach(function (b) {
    b.addEventListener("click", function () { tutorModal.open(); $("tutorName").focus(); });
  });
  function tutorText() {
    return ["TUTOR PROFILE DRAFT",
      "Name: " + ($("tutorName").value || "Not specified"),
      "Main subject: " + ($("tutorSubject").value || "Not specified"),
      "Experience: " + ($("tutorExperience").value || "Not specified"),
      "Teaching mode: " + $("tutorMode").value,
      "Starting fee: " + ($("tutorFee").value || "Open to discuss"),
      "Languages: " + ($("tutorLanguages").value || "Not specified"),
      "Teaching approach: " + ($("tutorBio").value || "Not specified")].join("\n");
  }
  $("downloadTutor").addEventListener("click", function () {
    var blob = new Blob([tutorText()], { type: "text/plain" }),
        url = URL.createObjectURL(blob), a = document.createElement("a");
    a.href = url; a.download = "tutor-profile-draft.txt"; a.click();
    URL.revokeObjectURL(url);
    $("tutorStatus").textContent = "Profile draft downloaded.";
  });
  $("copyTutor").addEventListener("click", function () {
    navigator.clipboard.writeText(tutorText()).then(function () {
      $("tutorStatus").textContent = "Profile draft copied to clipboard.";
    }, function () {
      $("tutorStatus").textContent = "Copy unavailable — please use Download profile draft.";
    });
  });

  /* ---------- contact form ---------- */
  $("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var name = $("contactName").value.trim(),
        email = $("contactEmail").value.trim(),
        msg = $("contactMsg").value.trim();
    var href = "mailto:hello@ustadhhub.com?subject=" +
      encodeURIComponent("UstadhHub contact from " + name) +
      "&body=" + encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\n" + msg);
    window.location.href = href;
    $("contactStatus").textContent = "Opening your email app — just press send to reach us.";
  });
})();
