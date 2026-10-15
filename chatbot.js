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
      '<div><h3>Razia Azeem Assistant</h3><p><span class="ra-online">● Online</span> — foran jawab</p></div>' +
      '<button class="ra-chat-x" id="ra-chat-x" aria-label="Close chat">✕</button>' +
    '</div>' +
    '<div id="ra-chat-msgs" aria-live="polite"></div>' +
    '<div id="ra-chips"></div>' +
    '<div class="ra-chat-input">' +
      '<input id="ra-chat-in" type="text" placeholder="Apna sawal likhein…" autocomplete="off" maxlength="500" />' +
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
  var DEFAULT_CHIPS = ["📚 Online classes", "💰 Fees / Timing", "📝 Blog dekhein", "📋 Lead form"];

  /* ---------- knowledge base (verified facts only) ---------- */
  function waHello(topic) {
    return WA_BASE + "?text=" + encodeURIComponent("Assalam-o-Alaikum! " + topic);
  }
  var RULES = [
    { k: ["salam", "assalam", "aoa", "adab", "hello", "hi", "hey", "salaam"],
      r: "Walaikum Assalam! 🤲 Main Razia Azeem Official ka assistant hoon. Online classes, blog ya kisi sawal me madad chahiye?" },
    { k: ["fee", "fees", "price", "qeemat", "pese", "paisy", "paisa", "kitne", "charges", "cost", "rate"],
      r: "Fees ki latest maloomat WhatsApp par confirm hoti hai — wahan foran jawab mil jayega: [WhatsApp par poochein](" + waHello("Online classes ki fees maloom karni hai.") + ") 🤲" },
    { k: ["time", "timing", "schedule", "waqt", "kab", "duration", "kitne baje"],
      r: "Class timing aap ke country ke hisab se set hoti hai. Latest schedule ke liye WhatsApp par rabta karein: [WhatsApp par poochein](" + waHello("Class timing maloom karni hai.") + ") 🕐" },
    { k: ["class", "classes", "course", "admission", "dakhla", "join", "parhna", "seekhna", "student", "talib"],
      r: "Online classes me dakhle ke liye WhatsApp par rabta karein: [" + WA_DISPLAY + "](" + WA_BASE + "). Ya neeche lead form bharein — hum khud rabta karenge 👇",
      chips: ["📋 Lead form bharein"] },
    { k: ["quran"],
      r: "Quran par hamare articles yahan parhein: [Quran category](" + SITE + "/categories/quran.html) 📖 — har article me surah:ayat references ke saath." },
    { k: ["hadith", "hadees"],
      r: "Hadith par articles yahan: [Hadith category](" + SITE + "/categories/hadith.html) 📜 — mustanad hawalon ke saath." },
    { k: ["dua", "duain", "fazilat"],
      r: "Duas aur un ki fazilat par articles: [Duas & Fazilat](" + SITE + "/categories/duas-fazilat.html) 🤲" },
    { k: ["stor", "kahani", "seerah", "waqia", "qissa"],
      r: "Seerah aur Islamic stories yahan parhein: [Seerah & Stories](" + SITE + "/categories/seerah-stories.html) ✨" },
    { k: ["video", "youtube", "yt"],
      r: "Videos ke liye YouTube channel: [Razia Azeem Official](" + YT + ") ▶️ — subscribe karna na bhoolein!" },
    { k: ["blog", "article", "mazmoon", "mazameen", "website"],
      r: "Blog par roz naye articles ate hain — Quran & Hadith references ke saath: [Saare articles](" + SITE + "/blog.html) 📝" },
    { k: ["contact", "rabta", "email", "mail"],
      r: "Rabte ke tareeqe:\n📧 Email: " + EMAIL + "\n💬 WhatsApp: [" + WA_DISPLAY + "](" + WA_BASE + ")\n1 working day me jawab mil jata hai." },
    { k: ["shukriya", "thanks", "thank", "jazak"],
      r: "JazakAllah khair! 🤲 Kuch aur poochna ho to hazir hoon." },
    { k: ["insan", "human", "agent", "baji", "razia", "aapa", "madam", "miss", "maam"],
      r: "Razia Azeem se direct baat ke liye WhatsApp behtreen hai: [" + WA_DISPLAY + "](" + WA_BASE + ") — 1 working day me jawab mil jata hai 💬" },
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
    botSay("Zaroor! Pehle apna **naam** batayein:");
    setChips([]);
  }
  function leadSummary() {
    return "📋 Aap ki request:\n• Naam: " + lead.name +
      "\n• WhatsApp: " + lead.phone +
      "\n• Dilchaspi: " + lead.interest +
      (lead.msg ? "\n• Paigham: " + lead.msg : "");
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
        '" target="_blank" rel="noopener">💬 WhatsApp par bhejein</a><br>' +
        '<a class="ra-mail-btn" href="mailto:' + EMAIL + "?subject=" +
        encodeURIComponent("Website lead: " + lead.name) + "&body=" +
        encodeURIComponent(text) + '">📧 Email par bhejein</a>');
      setTimeout(function () {
        addMsg("Shukriya " + lead.name + "! 🤲 Request tayyar hai — upar wala button dabayein, hum 1 working day me rabta karenge.", "bot");
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
    if (low === "cancel" || low === "rehne dein" || low === "rehne den") {
      state = "idle"; lead = {};
      botSay("Koi baat nahi! Kuch aur poochna ho to batayein 🙂");
      setChips(DEFAULT_CHIPS); return;
    }

    if (state === "lead_name") {
      if (text.length < 2) { botSay("Naam thora wazeh likhein please:"); return; }
      lead.name = text; state = "lead_phone";
      botSay("Shukriya " + text + "! Ab apna **WhatsApp number** likhein (misal: 0344 1234567):");
      return;
    }
    if (state === "lead_phone") {
      var ph = validPhone(text);
      if (!ph) { botSay("Number samajh nahi aya — dobara likhein (misal: 0344 1234567):"); return; }
      lead.phone = ph; state = "lead_interest";
      botSay("Kis cheez me interested hain?");
      setChips(["Online classes", "Blog topic request", "Sawal poochna hai", "Kuch aur"]);
      return;
    }
    if (state === "lead_interest") {
      lead.interest = text; state = "lead_msg";
      botSay("Koi paigham likhna chahein? (optional hai)");
      setChips(["Skip karein"]);
      return;
    }
    if (state === "lead_msg") {
      lead.msg = (low === "skip karein" || low === "skip") ? "" : text;
      leadDone(); return;
    }

    /* idle: keyword brain */
    var rule = findAnswer(text);
    if (rule) {
      if (rule.r === "__LEAD__") { startLead(); return; }
      botSay(rule.r);
      setChips(rule.chips || DEFAULT_CHIPS);
    } else {
      botSay("Maaf kijiye, main yeh samajh nahi paya. Apna sawal [WhatsApp par direct poochein](" +
        WA_BASE + ") — wahan Razia Azeem khud jawab dengi 💬");
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
        addMsg("Assalam-o-Alaikum! 🤲 Main Razia Azeem Official ka assistant hoon.\nOnline classes, blog ya kisi sawal me madad chahiye?", "bot");
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
