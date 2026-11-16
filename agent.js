/* Razia Azeem Official (blog) — assistant widget
   Rule-based assistant: blog FAQs + Academy FAQs + guided free-trial
   lead capture. Leads go to the visitor's own WhatsApp (wa.me) addressed
   to the Academy lead number +92 306 5015322. No backend; nothing leaves
   the visitor's browser except the message THEY choose to send. */
(function () {
  "use strict";

  var LEAD_WA = "923065015322";
  var LEAD_BASE = "https://wa.me/" + LEAD_WA;
  var EMAIL = "raziaazeem285@gmail.com";
  var YT = "https://www.youtube.com/@Raziaazeemofficial";

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  /* mini-markup for OUR OWN strings only: [label](https://... or /...) -> safe link */
  function rich(text) {
    var e = esc(text);
    return e.replace(/\[([^\]]+)\]\((https:\/\/[^)\s]+|\/[^)\s]*)\)/g,
      '<a href="$2" target="_blank" rel="noopener">$1</a>');
  }
  function $(id) { return document.getElementById(id); }

  /* ---------- styles (blog brand: deep navy + gold) ---------- */
  var css = [
    "#rao-btn{position:fixed;right:18px;bottom:18px;z-index:9998;width:58px;height:58px;border-radius:50%;border:2px solid #D4AF37;background:linear-gradient(135deg,#0E2242,#060F22);color:#E9CF7A;cursor:pointer;box-shadow:0 8px 24px rgba(6,15,34,.45);display:flex;align-items:center;justify-content:center;padding:0}",
    "#rao-btn svg{width:28px;height:28px;fill:#E9CF7A}",
    "#rao-btn .rao-ic-close{display:none}",
    "#rao-btn.open .rao-ic-chat{display:none}",
    "#rao-btn.open .rao-ic-close{display:block}",
    "#rao-btn .rao-dot{position:absolute;top:2px;right:2px;width:12px;height:12px;border-radius:50%;background:#2E9E5B;border:2px solid #060F22}",
    "#rao-panel{position:fixed;right:18px;bottom:86px;z-index:9999;width:min(360px,calc(100vw - 24px));height:min(540px,calc(100vh - 110px));background:#FDFBF5;border:1px solid #E3D5A8;border-radius:18px;box-shadow:0 18px 48px rgba(6,15,34,.35);display:none;flex-direction:column;overflow:hidden;font-family:inherit;color:#14213D}",
    "#rao-panel.open{display:flex}",
    ".rao-head{background:linear-gradient(135deg,#0A1A33,#0E2242);color:#F9F1D7;padding:13px 15px;display:flex;gap:10px;align-items:center}",
    ".rao-ava{width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#D4AF37,#C9A227);display:flex;align-items:center;justify-content:center;font-weight:700;color:#0A1A33;flex:none}",
    ".rao-head h3{margin:0;font-size:15px;line-height:1.2}",
    ".rao-head p{margin:2px 0 0;font-size:12px;opacity:.85}",
    ".rao-online{color:#7BD88F}",
    ".rao-x{margin-left:auto;background:none;border:none;color:#F9F1D7;font-size:17px;cursor:pointer;padding:4px}",
    "#rao-msgs{flex:1;overflow-y:auto;padding:13px;display:flex;flex-direction:column;gap:9px}",
    ".rao-msg{max-width:86%;padding:9px 12px;border-radius:14px;font-size:14px;line-height:1.45;white-space:pre-wrap;word-wrap:break-word}",
    ".rao-msg.bot{background:#fff;border:1px solid #E3D5A8;border-bottom-left-radius:4px;align-self:flex-start}",
    ".rao-msg.user{background:linear-gradient(135deg,#0E2242,#0A1A33);color:#F9F1D7;border-bottom-right-radius:4px;align-self:flex-end}",
    ".rao-msg a{color:#9A7B1C;font-weight:600}",
    ".rao-msg.user a{color:#E9CF7A}",
    "#rao-chips{display:flex;flex-wrap:wrap;gap:7px;padding:0 13px 10px}",
    ".rao-chip{border:1px solid #C9A227;background:#F9F1D7;color:#6B5510;border-radius:999px;padding:6px 12px;font-size:13px;cursor:pointer}",
    ".rao-chip:hover{background:#F1E3B3}",
    ".rao-input{display:flex;gap:8px;padding:10px 12px;border-top:1px solid #E3D5A8;background:#fff}",
    ".rao-input input{flex:1;border:1px solid #CBBD8A;border-radius:999px;padding:9px 13px;font-size:14px;outline:none;min-width:0}",
    ".rao-input button{background:linear-gradient(135deg,#D4AF37,#C9A227);color:#0A1A33;font-weight:700;border:none;border-radius:999px;padding:9px 16px;font-size:14px;cursor:pointer;flex:none}",
    ".rao-wa-btn{display:inline-block;margin-top:8px;background:#1FA855;color:#fff !important;padding:11px 18px;border-radius:999px;font-weight:700;text-decoration:none}",
    ".rao-cancel{margin-top:6px;background:none;border:none;color:#8a6d1f;font-size:12.5px;cursor:pointer;text-decoration:underline}"
  ].join("\n");
  var st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  /* ---------- build DOM ---------- */
  var btn = document.createElement("button");
  btn.id = "rao-btn";
  btn.setAttribute("aria-label", "Chat with the Razia Azeem Official assistant");
  btn.innerHTML =
    '<svg class="rao-ic-chat" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l4.9-1.4A10 10 0 1 0 12 2zm0 2a8 8 0 1 1-4.1 14.9l-.3-.2-2.3.7.7-2.3-.2-.3A8 8 0 0 1 12 4z"/></svg>' +
    '<svg class="rao-ic-close" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.3 5.7L12 12l6.3 6.3-1.4 1.4L10.6 13.4 5.7 18.3 4.3 16.9 10.6 10.6 4.3 4.3 5.7 2.9l4.9 4.9 6.3-6.3z" transform="translate(1.5 1.5) scale(.875)"/></svg>' +
    '<span class="rao-dot" aria-hidden="true"></span>';

  var panel = document.createElement("div");
  panel.id = "rao-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", "Razia Azeem Official assistant chat");
  panel.innerHTML =
    '<div class="rao-head">' +
      '<div class="rao-ava">RA</div>' +
      '<div><h3>Razia Azeem Assistant</h3><p><span class="rao-online">● Online</span> — replies instantly</p></div>' +
      '<button class="rao-x" id="rao-x" aria-label="Close chat">✕</button>' +
    '</div>' +
    '<div id="rao-msgs" aria-live="polite"></div>' +
    '<div id="rao-chips"></div>' +
    '<div class="rao-input">' +
      '<input id="rao-text" type="text" placeholder="Ask about articles or classes…" autocomplete="off">' +
      '<button id="rao-send" type="button">Send</button>' +
    '</div>';

  document.body.appendChild(btn);
  document.body.appendChild(panel);

  var msgs = $("rao-msgs"), chipsBox = $("rao-chips"), input = $("rao-text");
  var started = false;
  var state = "idle"; // idle | lead_name | lead_phone | lead_course | lead_country
  var lead = {};

  function addMsg(text, who) {
    var d = document.createElement("div");
    d.className = "rao-msg " + who;
    d.innerHTML = rich(text);
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
    return d;
  }
  function botSay(text) { addMsg(text, "bot"); }
  function userSay(text) { addMsg(text, "user"); }

  var DEFAULT_CHIPS = ["🎁 Book a FREE trial class", "📚 Academy courses", "💰 Fees", "📖 Blog articles", "🤲 Dua Library", "✉️ Contact"];
  function setChips(list) {
    chipsBox.innerHTML = "";
    (list || DEFAULT_CHIPS).forEach(function (label) {
      var b = document.createElement("button");
      b.className = "rao-chip";
      b.type = "button";
      b.textContent = label;
      b.addEventListener("click", function () { handleUser(label); });
      chipsBox.appendChild(b);
    });
  }

  /* ---------- knowledge (facts from the blog + Academy sites only) ---------- */
  var COURSES = ["Noorani Qaida", "Nazra Quran", "Hifz-ul-Quran", "Tajweed-ul-Quran",
    "Islamic Studies for Kids", "Namaz & Masnoon Duas", "Quran Translation",
    "Tafseer-ul-Quran", "Quranic Arabic", "Seerah Stories for Kids"];

  function coursesText() {
    return "Razia Azeem Academy offers 10 online Quran courses, one-on-one:\n• " +
      COURSES.join("\n• ") +
      "\n\nClasses are for kids and beginners, in Urdu & English, at timings that suit your country. The first step is a **3-day FREE trial** — tap below to book it.";
  }
  function feesText() {
    return "Academy monthly fees (Starter / Regular / Accelerated):\n🇺🇸 US: $35 / $49 / $79\n🇬🇧 UK: £28 / £39 / £59\n🇦🇺 AU: AU$55 / AU$79 / AU$119\n\nThere is a **10% sibling discount**, and every new student starts with a **3-day FREE trial** — no card needed. Final plan details are confirmed on WhatsApp when you book.";
  }
  function articlesText() {
    return "This blog — **Razia Azeem Official** — publishes Islamic knowledge articles in these categories:\n• [Quran](/categories/quran.html)\n• [Hadith](/categories/hadith.html)\n• [Duas & Fazilat](/categories/duas-fazilat.html)\n• [Seerah & Stories](/categories/seerah-stories.html)\n• [Daily Life](/categories/daily-life.html)\n\nBrowse everything on the [Blog page](/blog.html), or visit the [Dua Library](/dua-library/) for daily duas. New videos also appear on our [YouTube channel](" + YT + ").";
  }

  var RULES = [
    { k: ["fee", "fees", "price", "cost", "charges", "how much", "monthly"],
      f: function () { botSay(feesText()); setChips(["🎁 Book a FREE trial class", "📚 Academy courses", "👩‍🏫 Teachers"]); } },
    { k: ["course", "courses", "class", "classes", "subject", "learn", "teach", "qaida", "nazra", "hifz", "tajweed", "tafseer", "translation"],
      f: function () { botSay(coursesText()); setChips(["🎁 Book a FREE trial class", "💰 Fees", "👩‍🏫 Teachers"]); } },
    { k: ["teacher", "teachers", "female", "male", "lady", "ustadh", "ustad", "qari"],
      f: function () { botSay("Choose from our available **male and female Quran teachers**. Every class is one-on-one, so your child learns at their own pace. Book the **3-day FREE trial** and we will match a teacher to your timing."); setChips(["🎁 Book a FREE trial class", "💰 Fees", "📚 Academy courses"]); } },
    { k: ["timing", "timings", "time", "schedule", "when"],
      f: function () { botSay("Class timings are flexible and set around **your country's time zone** and your family's routine. Tell us your country when you book the free trial, and we will confirm the schedule on WhatsApp."); setChips(["🎁 Book a FREE trial class", "💰 Fees"]); } },
    { k: ["article", "articles", "blog", "post", "posts", "read", "topics", "categor"],
      f: function () { botSay(articlesText()); setChips(DEFAULT_CHIPS); } },
    { k: ["dua", "duas", "library", "wazifa", "adhkar"],
      f: function () { botSay("Visit our [Dua Library](/dua-library/) — a collection of authentic daily duas. Articles about the virtues of duas are in [Duas & Fazilat](/categories/duas-fazilat.html)."); setChips(DEFAULT_CHIPS); } },
    { k: ["hadith", "hadees"],
      f: function () { botSay("Read our Hadith articles here: [Hadith category](/categories/hadith.html) — every article carries its references (book and number)."); setChips(DEFAULT_CHIPS); } },
    { k: ["quran", "surah", "ayat", "verse"],
      f: function () { botSay("Read our Quran articles here: [Quran category](/categories/quran.html). And if you'd like to *learn* to read the Quran properly, the Academy's Nazra and Tajweed courses start with a **3-day FREE trial**."); setChips(["🎁 Book a FREE trial class", "📚 Academy courses"]); } },
    { k: ["seerah", "stories", "story", "history", "prophet"],
      f: function () { botSay("Read Seerah and Islamic stories here: [Seerah & Stories](/categories/seerah-stories.html). Stories are also told on our [YouTube channel](" + YT + ")."); setChips(DEFAULT_CHIPS); } },
    { k: ["youtube", "video", "videos", "channel", "watch"],
      f: function () { botSay("Our videos — Quran & Hadith, Islamic stories, duas and motivation — are on YouTube: [Razia Azeem Official](" + YT + "). New videos are also shared as posts on this blog."); setChips(DEFAULT_CHIPS); } },
    { k: ["contact", "email", "phone", "talk", "human", "help"],
      f: function () { botSay("You can reach us at:\n✉️ Email: " + EMAIL + "\n💬 For class enquiries, the fastest way is the **free trial** booking below — your message goes straight to the Academy on WhatsApp."); setChips(["🎁 Book a FREE trial class", "💰 Fees"]); } },
    { k: ["discount", "sibling", "brother", "sister", "two kids", "2 kids"],
      f: function () { botSay("Yes — there is a **10% sibling discount** when more than one child from the same family enrolls. Book a free trial for each child and mention they are siblings."); setChips(["🎁 Book a FREE trial class", "💰 Fees"]); } },
    { k: ["salam", "hello", "hi", "hey", "assalam"],
      f: function () { botSay("Wa Alaikum Assalam! 🌙 Welcome to Razia Azeem Official. I can show you our articles, explain the Academy's online Quran classes and fees, or book your **3-day FREE trial class**."); setChips(DEFAULT_CHIPS); } },
    { k: ["thank", "shukria", "jazak"],
      f: function () { botSay("You're most welcome! 🌙 May Allah bless your learning. If you'd like, I can book your free trial class now."); setChips(DEFAULT_CHIPS); } }
  ];

  /* ---------- free-trial lead flow ---------- */
  function startLead() {
    state = "lead_name";
    lead = {};
    botSay("Wonderful! 🎁 Let's book your **3-day FREE trial class** (no card needed).\nFirst, please tell me your **name**:");
    setChips(["✖ Cancel"]);
  }
  function cancelLead() {
    state = "idle";
    lead = {};
    botSay("No problem — cancelled. Ask me anything about the articles or the Academy, or tap below whenever you're ready.");
    setChips(DEFAULT_CHIPS);
  }
  function leadStep(text) {
    if (state === "lead_name") {
      lead.name = text;
      state = "lead_phone";
      botSay("Jazakumullah, " + lead.name + "! Now your **WhatsApp number** (with country code), so the Academy can confirm your trial:");
      setChips(["✖ Cancel"]);
      return;
    }
    if (state === "lead_phone") {
      var digits = text.replace(/[^\d]/g, "");
      if (digits.length < 7 || digits.length > 15) {
        botSay("That number looks incomplete — please share your WhatsApp number with country code (7–15 digits):");
        return;
      }
      lead.phone = text;
      state = "lead_course";
      botSay("Which **course** are you interested in? Tap one, or type it:");
      setChips(COURSES.concat(["✖ Cancel"]));
      return;
    }
    if (state === "lead_course") {
      lead.course = text;
      state = "lead_country";
      botSay("And your **country**? (Class timings and fees are set by country.)");
      setChips(["🇬🇧 UK", "🇺🇸 USA", "🇦🇺 Australia", "🇨🇦 Canada", "Other", "✖ Cancel"]);
      return;
    }
    if (state === "lead_country") {
      lead.country = text.replace(/^[^\p{L}]+/u, "").trim() || text;
      state = "idle";
      var msg = "Assalam-o-Alaikum! I want to book a FREE trial class.\n" +
        "Name: " + lead.name + "\nWhatsApp: " + lead.phone +
        "\nCourse: " + lead.course + "\nCountry: " + lead.country +
        "\n(Sent from the Razia Azeem Official blog assistant)";
      botSay("📋 Your free trial request:\n• Name: " + lead.name + "\n• WhatsApp: " + lead.phone +
        "\n• Course: " + lead.course + "\n• Country: " + lead.country +
        "\nTap the button below to send it to the Academy on WhatsApp — they will confirm your trial class timings there.");
      var d = addMsg("", "bot");
      d.innerHTML = '<a class="rao-wa-btn" href="' + LEAD_BASE + "?text=" + encodeURIComponent(msg) +
        '" target="_blank" rel="noopener">💬 Send on WhatsApp</a>';
      setChips(DEFAULT_CHIPS);
      return;
    }
  }

  function handleUser(raw) {
    var clean = raw.replace(/^[^\p{L}\p{N}]+/u, "").trim();
    if (!clean) return;
    userSay(raw);
    var lower = clean.toLowerCase();

    if (state !== "idle") {
      if (lower === "cancel" || raw.indexOf("Cancel") !== -1) { cancelLead(); return; }
      leadStep(clean);
      return;
    }
    if (lower.indexOf("free trial") !== -1 || lower.indexOf("book a") !== -1 ||
        lower === "trial" || lower.indexOf("enroll") !== -1 || lower.indexOf("register") !== -1 ||
        lower.indexOf("join") !== -1 || lower.indexOf("admission") !== -1) {
      startLead();
      return;
    }
    var text = " " + lower.replace(/[^\p{L}\p{N}\s']/gu, " ").replace(/\s+/g, " ") + " ";
    for (var i = 0; i < RULES.length; i++) {
      var r = RULES[i];
      for (var j = 0; j < r.k.length; j++) {
        if (text.indexOf(" " + r.k[j] + " ") !== -1 || text.indexOf(" " + r.k[j]) !== -1) {
          r.f();
          return;
        }
      }
    }
    botSay("I can help with:\n📖 Finding an article (Quran, Hadith, Duas, Seerah)\n📚 Academy courses & fees\n🎁 Booking your **3-day FREE trial class**\nTap a button below, or type your question.");
    setChips(DEFAULT_CHIPS);
  }

  function start() {
    if (started) return;
    started = true;
    botSay("Assalam-o-Alaikum! 🌙 Welcome to **Razia Azeem Official** — Islamic knowledge, Quran & Hadith.\nI can help you find an article, explain our online Quran Academy, or book a **3-day FREE trial class**. How can I help?");
    setChips(DEFAULT_CHIPS);
  }

  function toggle(open) {
    var willOpen = typeof open === "boolean" ? open : !panel.classList.contains("open");
    panel.classList.toggle("open", willOpen);
    btn.classList.toggle("open", willOpen);
    if (willOpen) { start(); input.focus(); }
  }
  btn.addEventListener("click", function () { toggle(); });
  $("rao-x").addEventListener("click", function () { toggle(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") toggle(false); });
  $("rao-send").addEventListener("click", function () {
    var v = input.value.trim();
    if (!v) return;
    input.value = "";
    handleUser(v);
  });
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") { $("rao-send").click(); }
  });
})();
