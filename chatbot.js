/* Razia Azeem Official — chatbot widget
   Rule-based assistant: FAQs + guided lead capture.
   Leads go to the visitor's WhatsApp (wa.me) addressed to +92 344 0325566,
   with a mailto fallback. No backend, no data leaves the visitor's browser
   except the message THEY choose to send. */
(function () {
  "use strict";

  var WA_NUMBER = "923440325566";
  var WA_DISPLAY = "+92 344 0325566";
  var WA_BASE = "https://wa.me/" + WA_NUMBER;
  var EMAIL = "raziaazeem285@gmail.com";
  var SITE = "https://ustadh-hub.vercel.app";
  var YT = "https://www.youtube.com/@Raziaazeemofficial";

  /* ---------- tiny helpers ---------- */
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  /* mini-markup for OUR OWN strings only: [label](https://url) -> safe link */
  function rich(text) {
    var e = esc(text);
    return e.replace(/\[([^\]]+)\]\((https:\/\/[^)\s]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener">$1</a>');
  }
  function $(id) { return document.getElementById(id); }

  /* ---------- build DOM ---------- */
  var btn = document.createElement("button");
  btn.id = "ra-chat-btn";
  btn.setAttribute("aria-label", "Chat with Razia Azeem assistant");
  btn.innerHTML =
    '<svg class="ra-ic-chat" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l4.9-1.4A10 10 0 1 0 12 2zm0 2a8 8 0 1 1-4.1 14.9l-.3-.2-2.3.7.7-2.3-.2-.3A8 8 0 0 1 12 4zm-3.2 4.1c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.9 4.5 3.9 2.2.9 2.7.7 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.3l-2-1c-.2-.1-.4-.1-.6.1l-.9 1.1c-.2.2-.3.2-.6.1a7.6 7.6 0 0 1-2.2-1.4 8.3 8.3 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.5-.6c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5L8.9 6.6c-.2-.4-.4-.5-.7-.5z"/></svg>' +
    '<svg class="ra-ic-close" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.3 5.7L12 12l6.3 6.3-1.4 1.4L10.6 13.4 5.7 18.3 4.3 16.9 10.6 10.6 4.3 4.3 5.7 2.9l4.9 4.9 6.3-6.3z" transform="translate(1.5 1.5) scale(.875)"/></svg>' +
    '<span class="ra-dot" aria-hidden="true"></span>';

  var panel = document.createElement("div");
  panel.id = "ra-chat-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", "Razia Azeem assistant chat");
  panel.innerHTML =
    '<div class="ra-chat-head">' +
      '<div class="ra-chat-ava">RA</div>' +
      '<div><h3>Razia Azeem Assistant</h3><p><span class="ra-online">● Online</span> — replies instantly</p></div>' +
      '<button class="ra-chat-x" id="ra-chat-x" aria-label="Close chat">✕</button>' +
    '</div>' +
    '<div id="ra-chat-msgs" aria-live="polite"></div>' +
    '<div id="ra-chips"></div>' +
    '<div class="ra-chat-input">' +
      '<input id="ra-chat-in" type="text" placeholder="Type your question…" autocomplete="off" maxlength="500" />' +
      '<button id="ra-chat-send" aria-label="Send message">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.4 20.4l17.5-8.4L3.4 3.6l-.01 6.53L14 12 3.39 13.87z"/></svg>' +
      '</button>' +
    '</div>';

  document.body.appendChild(btn);
  document.body.appendChild(panel);

  var msgs = $("ra-chat-msgs"), chipsBox = $("ra-chips"),
      input = $("ra-chat-in"), sendBtn = $("ra-chat-send");

  var state = "idle";       // idle | lead_name | lead_phone | lead_interest | lead_msg
  var lead = {};
  var greeted = false;

  /* ---------- message rendering ---------- */
  function scrollDown() { msgs.scrollTop = msgs.scrollHeight; }
  function addMsg(text, who) {
    var d = document.createElement("div");
    d.className = "ra-msg " + who;
    if (who === "bot") d.innerHTML = rich(text);
    else d.textContent = text;               // user text: NEVER as HTML
    msgs.appendChild(d); scrollDown();
  }
  function addRaw(html) {                     // OUR OWN html only (buttons etc.)
    var d = document.createElement("div");
    d.className = "ra-msg bot";
    d.innerHTML = html;
    msgs.appendChild(d); scrollDown();
  }
  function showTyping(cb) {
    var t = document.createElement("div");
    t.className = "ra-typing"; t.setAttribute("aria-hidden", "true");
    t.innerHTML = "<i></i><i></i><i></i>";
    msgs.appendChild(t); scrollDown();
    setTimeout(function () { t.remove(); cb(); }, 550);
  }
  function botSay(text) { showTyping(function () { addMsg(text, "bot"); }); }
  function setChips(list) {
    chipsBox.innerHTML = "";
    list.forEach(function (c) {
      var b = document.createElement("button");
      b.className = "ra-chip"; b.type = "button"; b.textContent = c;
      b.addEventListener("click", function () { handleUser(c); });
      chipsBox.appendChild(b);
    });
  }
  var DEFAULT_CHIPS = ["📚 Online classes", "🎁 Free trial", "💰 Fees / Timing", "📋 Lead form"];

  /* ---------- knowledge base (verified facts only) ---------- */
  function waHello(topic) {
    return WA_BASE + "?text=" + encodeURIComponent("Assalam-o-Alaikum! " + topic);
  }
  var RULES = [
    { k: ["salam", "assalam", "aoa", "adab", "hello", "hi", "hey", "salaam"],
      r: "Walaikum Assalam! 🤲 I'm the Razia Azeem Official assistant. Need help with online classes, the blog, or anything else?" },
    { k: ["fee", "fees", "price", "qeemat", "pese", "paisy", "paisa", "kitne", "charges", "cost", "rate"],
      r: "Final fee details are confirmed on WhatsApp: [Ask on WhatsApp](" + waHello("I want to know the online class fees.") + "). But here's the good news 🎁 — the first **trial class is ABSOLUTELY FREE**! Tap the button below, share your details, and we'll schedule your free trial class.",
      chips: ["🎁 I want a free trial class", "💬 Ask on WhatsApp"] },
    { k: ["time", "timing", "schedule", "waqt", "kab", "duration", "kitne baje"],
      r: "Class timings are set according to your country — the final schedule comes on WhatsApp: [Ask on WhatsApp](" + waHello("I want to know the class timings.") + ") 🕐 Remember, the first **trial class is FREE** 🎁 — share your details and we'll confirm the schedule.",
      chips: ["🎁 I want a free trial class", "💬 Ask on WhatsApp"] },
    { k: ["trial", "free"],
      r: "__TRIAL__" },
    { k: ["class", "classes", "course", "admission", "dakhla", "join", "parhna", "seekhna", "student", "talib"],
      r: "To enroll in online classes, message us on WhatsApp: [" + WA_DISPLAY + "](" + WA_BASE + "). Good news 🎁 — the first **trial class is ABSOLUTELY FREE**!",
      chips: ["🎁 I want a free trial class", "📋 Fill the lead form"] },
    { k: ["quran"],
      r: "Read our Quran articles here: [Quran category](" + SITE + "/categories/quran.html) 📖 — every article with surah:ayat references." },
    { k: ["hadith", "hadees"],
      r: "Hadith articles here: [Hadith category](" + SITE + "/categories/hadith.html) 📜 — with authentic references." },
    { k: ["dua", "duain", "fazilat"],
      r: "Articles on duas and their virtues: [Duas & Fazilat](" + SITE + "/categories/duas-fazilat.html) 🤲" },
    { k: ["stor", "kahani", "seerah", "waqia", "qissa"],
      r: "Read seerah and Islamic stories here: [Seerah & Stories](" + SITE + "/categories/seerah-stories.html) ✨" },
    { k: ["video", "youtube", "yt"],
      r: "For videos, visit our YouTube channel: [Razia Azeem Official](" + YT + ") ▶️ — don't forget to subscribe!" },
    { k: ["blog", "article", "mazmoon", "mazameen", "website"],
      r: "New articles on the blog every day — with Quran & Hadith references: [All articles](" + SITE + "/blog.html) 📝" },
    { k: ["contact", "rabta", "email", "mail"],
      r: "Ways to reach us:\n📧 Email: " + EMAIL + "\n💬 WhatsApp: [" + WA_DISPLAY + "](" + WA_BASE + ")\nWe reply within 1 working day." },
    { k: ["shukriya", "thanks", "thank", "jazak"],
      r: "JazakAllah khair! 🤲 I'm here if you need anything else." },
    { k: ["insan", "human", "agent", "baji", "razia", "aapa", "madam", "miss", "maam"],
      r: "WhatsApp is best for talking to Razia Azeem directly: [" + WA_DISPLAY + "](" + WA_BASE + ") — we reply within 1 working day 💬" },
    { k: ["lead", "form"],
      r: "__LEAD__" }
  ];

  function findAnswer(text) {
    var t = " " + text.toLowerCase() + " ";
    for (var i = 0; i < RULES.length; i++) {
      var rule = RULES[i];
      for (var j = 0; j < rule.k.length; j++) {
        if (t.indexOf(rule.k[j]) > -1) return rule;
      }
    }
    return null;
  }

  /* ---------- lead capture flow ---------- */
  function saveLeadLocal(l) {
    try {
      var arr = JSON.parse(localStorage.getItem("ra_leads") || "[]");
      arr.push(l); localStorage.setItem("ra_leads", JSON.stringify(arr));
    } catch (e) { /* storage unavailable — ignore */ }
  }
  function startLead() {
    state = "lead_name"; lead = {};
    botSay("Of course! First, please tell me your **name**:");
    setChips([]);
  }
  function startTrial() {
    state = "lead_name"; lead = { interest: "Free trial class" };
    botSay("Wonderful! 🎁 For the free trial class, first tell me your **name**:");
    setChips([]);
  }
  function leadSummary() {
    return "📋 Your request:\n• Name: " + lead.name +
      "\n• WhatsApp: " + lead.phone +
      "\n• Interested in: " + lead.interest +
      (lead.msg ? "\n• Message: " + lead.msg : "");
  }
  function leadDone() {
    var text = "Assalam-o-Alaikum! Website admission inquiry:\n" +
      "Name: " + lead.name + "\nWhatsApp: " + lead.phone +
      "\nInterested in: " + lead.interest +
      (lead.msg ? "\nMessage: " + lead.msg : "");
    saveLeadLocal({ name: lead.name, phone: lead.phone, interest: lead.interest,
      msg: lead.msg || "", at: new Date().toISOString() });
    showTyping(function () {
      addMsg(leadSummary(), "bot");
      addRaw(
        '<a class="ra-wa-btn" href="' + WA_BASE + "?text=" + encodeURIComponent(text) +
        '" target="_blank" rel="noopener">💬 Send via WhatsApp</a><br>' +
        '<a class="ra-mail-btn" href="mailto:' + EMAIL + "?subject=" +
        encodeURIComponent("Website lead: " + lead.name) + "&body=" +
        encodeURIComponent(text) + '">📧 Send via Email</a>');
      setTimeout(function () {
        addMsg("Thank you " + lead.name + "! 🤲 Your request is ready — tap the button above, and we'll contact you within 1 working day.", "bot");
        setChips(DEFAULT_CHIPS);
      }, 700);
    });
    state = "idle"; lead = {};
  }
  function validPhone(raw) {
    var d = raw.replace(/\D/g, "");
    if (d.length === 12 && d.indexOf("92") === 0) return d;
    if (d.length === 11 && d.charAt(0) === "0") return d;
    if (d.length === 10) return d;
    return null;
  }

  /* ---------- main input handler ---------- */
  function handleUser(text) {
    text = String(text || "").trim();
    if (!text) return;
    addMsg(text, "user");
    setChips([]);

    var low = text.toLowerCase();
    if (low === "cancel" || low === "never mind" || low === "rehne dein" || low === "rehne den") {
      state = "idle"; lead = {};
      botSay("No problem! Let me know if you need anything else 🙂");
      setChips(DEFAULT_CHIPS); return;
    }
    if (state === "idle" && low.indexOf("free trial") > -1) { startTrial(); return; }
    if (text === "💬 Ask on WhatsApp") {
      window.open(waHello("I would like information about online classes."), "_blank");
      botSay("Opening WhatsApp — type your question there 💬");
      setChips(DEFAULT_CHIPS); return;
    }

    if (state === "lead_name") {
      if (text.length < 2) { botSay("Please write your name a bit more clearly:"); return; }
      lead.name = text; state = "lead_phone";
      botSay("Thank you " + text + "! Now please write your **WhatsApp number** (e.g. 0344 1234567):");
      return;
    }
    if (state === "lead_phone") {
      var ph = validPhone(text);
      if (!ph) { botSay("I couldn't understand that number — please write it again (e.g. 0344 1234567):"); return; }
      lead.phone = ph; state = "lead_interest";
      botSay("What are you interested in?");
      setChips(["🎁 Free trial class", "Online classes", "Blog topic request", "I have a question", "Something else"]);
      return;
    }
    if (state === "lead_interest") {
      lead.interest = text; state = "lead_msg";
      botSay("Would you like to add a message? (optional)");
      setChips(["Skip"]);
      return;
    }
    if (state === "lead_msg") {
      lead.msg = (low === "skip") ? "" : text;
      leadDone(); return;
    }

    /* idle: keyword brain */
    var rule = findAnswer(text);
    if (rule) {
      if (rule.r === "__LEAD__") { startLead(); return; }
      if (rule.r === "__TRIAL__") { startTrial(); return; }
      botSay(rule.r);
      setChips(rule.chips || DEFAULT_CHIPS);
    } else {
      botSay("Sorry, I didn't understand that. [Ask your question directly on WhatsApp](" +
        WA_BASE + ") — Razia Azeem herself will reply there 💬");
      setChips(DEFAULT_CHIPS);
    }
  }

  /* ---------- open / close ---------- */
  function toggle(force) {
    var open = typeof force === "boolean" ? force : !panel.classList.contains("open");
    panel.classList.toggle("open", open);
    btn.classList.toggle("open", open);
    if (open && !greeted) {
      greeted = true;
      showTyping(function () {
        addMsg("Assalam-o-Alaikum! 🤲 I'm the Razia Azeem Official assistant.\nNeed help with online classes, the blog, or anything else?", "bot");
        setChips(DEFAULT_CHIPS);
      });
    }
    if (open) setTimeout(function () { input.focus(); }, 350);
  }
  btn.addEventListener("click", function () { toggle(); });
  $("ra-chat-x").addEventListener("click", function () { toggle(false); });
  sendBtn.addEventListener("click", function () { handleUser(input.value); input.value = ""; });
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") { handleUser(input.value); input.value = ""; }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && panel.classList.contains("open")) toggle(false);
  });
})();
