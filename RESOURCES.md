# Saved Resources — Razia Azeem Official

Kaam ki cheezen jo future projects me kaam ayengi. Jab koi nayi useful repo/link mile, yahan add karte jayen.

---

## 🎨 Design

- **design-resources-for-developers** (bradtraversy, 67k+ stars, MIT)
  https://github.com/bradtraversy/design-resources-for-developers
  Free design websites ki bari list — stock photos/videos, fonts (Arabic fonts bhi), colors, icons, online design tools, AI graphic tools.
  Kaam: website design + thumbnails. Install nahi karna, sirf bookmark/list hai.
  Saved: 15 Oct 2026

---

## 📚 Seekhna (Learning)

- **generative-ai-for-beginners** (Microsoft, 121k+ stars, MIT)
  https://github.com/microsoft/generative-ai-for-beginners
  21 lessons wala free AI course — Generative AI, prompt engineering, chat/image apps, AI agents. Har lesson me video + code examples.
  Khaas baat: **Urdu translation bhi mojood hai.** Thora technical hai (Python), lekin AI samajhne ke liye behtareen.
  Saved: 15 Oct 2026

---

## 🤖 AI Agents (laptop par chalne wale)

- **OpenHuman** (tinyhumansai, 8.7k+ stars, GPL-3.0)
  https://github.com/tinyhumansai/openhuman
  Apne laptop par chalne wala personal AI assistant (Jarvis-style) — Gmail/calendar/GitHub connect karke har 20 min khud update hota hai, data machine par rehta hai.
  Note: early beta hai; AI model ke liye API key ya local model (Ollama) chahiye.
  Saved: 15 Oct 2026

- **AionUi** (iOfficeAI, 27k+ stars, Apache-2.0)
  https://github.com/iOfficeAI/AionUi
  Laptop par AI workspace (Jarvis-style, visual interface) — Claude Code, Codex, Gemini, OpenClaw sab ek screen me. Built-in agent Google login se chalta hai, schedule tasks (raat ko auto kaam), mobile se access.
  Download: https://github.com/iOfficeAI/AionUi/releases (Windows/macOS/Linux)
  Saved: 15 Oct 2026

- **agency-agents** (msitarzewski, 159k+ stars, MIT)
  https://github.com/msitarzewski/agency-agents
  230+ specialist AI subagent prompts (Content Creator, Reality Checker, Growth Hacker waghera) — Claude Code/Cursor/Codex/OpenClaw ke liye.
  Note: alag tool nahi, prompt packs hain; AionUi + OpenClaw lagane ke baad kaam ayenge.
  Saved: 15 Oct 2026

- **agent-reach** (Panniantong, 97k+ stars, MIT)
  https://github.com/Panniantong/agent-reach
  AI agent ko internet parhne ki taqat dene wala FREE tool (Python CLI, zero API fees) — YouTube subtitles/search, web pages, RSS, GitHub, Twitter/X, Reddit, Facebook, Instagram sab ek command se. `agent-reach doctor` bataata hai kaunsi cheez chal rahi hai, kaunsi nahi.
  Kaam: apne laptop ke agent (AionUi/OpenClaw/Claude Code) ke saath research — YouTube video ka khulasa, web search, news.
  Note: YouTube/web/RSS bilkul free, koi setup nahi; Twitter/Reddit/FB/IG ke liye apne browser login se chalta hai (apne account ki safety ke liye chhota alag account behtar).
  Saved: 15 Oct 2026

---

## 🔌 Free APIs

- **public-apis** (public-apis, 489k+ stars, MIT)
  https://github.com/public-apis/public-apis
  Hazaaron FREE APIs ki bari categorized list — weather, news, books, Quran, music, AI/ML, dictionaries waghera. Har API ke saath likha hota hai key chahiye ya nahi.
  Kaam: future apps/tools ke liye free data — Ayah Thumbnail Generator me AlQuran Cloud API bhi isi list se mili thi.
  Saved: 15 Oct 2026

---

## 🎬 YouTube Automation

- **youtube-automation-agent** (darkzOGx, 4.3k+ stars, free & open source)
  https://github.com/darkzOGx/youtube-automation-agent
  7 AI agents ki team jo YouTube channel 24/7 chalati hai — topic strategy, script writing, thumbnails, SEO, video production, publishing, aur analytics feedback loop (har video ki performance se seekh kar agli videos behtar). Live dashboard (localhost:3456). `npm install` + `npm run walkthrough` se guided setup.
  Kaam: YouTube *upload* automation — wohi hissa jo hamare 11am factory cron me abhi manual hai (script/thumbnail/SEO hum pehle hi banate hain).
  Notes (imandari se): (1) apne laptop par chalta hai (Node.js 18+) — laptop on rakhna parega; (2) free path ke liye Gemini API key chahiye — aap ki dono Gemini keys Google-side blocked hain, pehle ye masla hal karna hoga; (3) YouTube connect karne ke liye ek dafa Google Cloud setup (YouTube Data API v3 + OAuth) karna parega — thora technical, magar walkthrough guide karta hai; (4) is ke banaye videos hamare brand rules (explicit Quran/Hadith hawale, no faces) follow nahi karenge — customize karna parega.
  Saved: 16 Oct 2026 (Mahan Jafari ke Facebook reel se)

- **youtube-agent-skill** (Jakeschincariol, 1.5k+ stars, README ke mutabiq MIT)
  https://github.com/Jakeschincariol/youtube-agent-skill
  11 Claude skills jo YouTube channel chalate hain — /yt-script (21 hook formulas se scored script), /yt-package (title+thumbnail ek pairing me lint), /yt-edit (transcript se edit decision list), /yt-comment (comments ke replies aap ki awaz me), /yt-plan (upload plan), /yt-viral (niche me kya chal raha hai), /yt-retention (retention export parho — viewers kahan chhorte hain), /yt-shorts (lambi video se Shorts nikalo), /yt-seo, /yt-chapters, /yt-audit. Sath 6 Python tools, koi dependency nahi (hookscore.py, title.py, deadair.py, chapters.py, retention.py, swipe.py).
  Kaam: hamare 11am factory cron ko *behtar* banana — hook scoring, title+thumbnail linting, retention analysis (feedback loop!), Shorts finder. "Nothing gets published until you do it" — aap ka review+upload wala nizam barkarar rehta hai.
  Notes (imandari se): ye Claude Code ke liye bane hain, magar har SKILL.md kisi bhi chat me paste karke mode ki tarah chal sakta hai — aur main in ke tareeqe + Python tools apne computer par aap ki factory me laga sakta hun, aap ko kuch install nahi karna parega. Reel me nazar aane wala kumarde826581-del/ wala copy sirf fork hai — asal repo yehi hai.
  Saved: 16 Oct 2026 (Samarthh.builds ke reel se)
