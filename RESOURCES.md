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


- **Dola AI** (dolai.video — browser-based AI video generator, free tier)
  https://www.dolai.video/
  Text-to-video + image-to-video (Seedance models) — browser me chalta hai, free daily credits, credit card nahi chahiye, watermark-free downloads.
  Kaam: **The Mother Monster** film ke 8 clips aur Mummy skit ke scenes — mere environment me real AI video generation region-blocked hai (403), is liye ye clips aap ko khud banane hain; Dola AI ka free tier is ke liye seedha option hai (Runway/Pika/Leonardo ke sath).
  Notes (imandari se): (1) free tier personal/evaluation use ke liye hai — commercial license paid plans me hai ($19.9–$99.9/month); (2) clips 5–15 second ke hote hain — Mother Monster ke har scene ke liye theek hai; (3) reel me bataya gaya "account delete karke dobara banao" wala trick un ke terms ke khilaf hai — account ban ho sakta hai, ye na karein; (4) reel ka "300 million views" wala dawa verify nahi ho saka — hype ho sakta hai.
  Saved: 16 Oct 2026 ("Listen to Tahir" ke Facebook reel se — DOLA)

---

## 📸 Instagram Automation

- **instagram-agent-skill** (Jakeschincariol, 1.5k+ stars, README ke mutabiq MIT)
  https://github.com/Jakeschincariol/instagram-agent-skill
  13 Claude skills jo Instagram account chalati hain — /ig-reel (26 hook formulas se scored Reel script + beat sheet), /ig-viral (aap ke niche me kya chal raha hai, outlier ranking), /ig-caption (caption lint — feed me "... more" se pehle nazar aane wale 125 characters ka preview), /ig-carousel, /ig-story (daily story sequence + DM funnel), /ig-profile (profile ko 12-part rubric par /100 score karke behtar likho), /ig-plan (haftay ka posting plan), /ig-human (humanizer — AI wali "slop" language, em dashes aur invisible watermark characters saaf karta hai), /ig-comment, /ig-reply, /ig-dm, /ig-repurpose, /ig-audit. Sath Python tools (hook scoring, humanizer).
  Kaam: hamare daily social auto-posts (FB Page + Instagram) ko *behtar* banana — behtar hooks, captions, viral research, profile polish. "Nothing gets posted until you say yes" — aap ka approval wala nizam barkarar rehta hai.
  Notes (imandari se): yehi wohi author hai jis ka youtube-agent-skill hum ne save kiya tha — dono ka style ek hai, dono ek doosre ko complement karte hain. Main in ke tareeqe + Python tools apne computer par aap ki factory/social pipeline me laga sakta hun — aap ko kuch install nahi karna parega. Aap ke Islamic brand ke liye hooks/captions customize karna parega (explicit Quran/Hadith hawale, decent tone, no "🔥🔥🔥" wali cheap engagement).
  Saved: 16 Oct 2026 (Rajenlabs ke Facebook reel se — "Bas 2 Kaam Karo: Copy → Paste")

---

## 🎙️ Voice & Audio

- **TTS** (coqui-ai, 46k+ stars, MPL-2.0)
  https://github.com/coqui-ai/TTS
  Open-source text-to-speech toolkit — 1100+ pretrained models, XTTS voice cloning (16 languages), apni awaz train karne ke tools. Python library; research aur production dono me istemal hota hai.
  Kaam: future me English voiceover experiments — jab voiceover dobara shuru ho.
  Notes (imandari se): (1) XTTS me **Urdu support NAHI** — 16 languages me Urdu shamil nahi (Razia ne kaha English hi kaafi hai, is liye save kiya); (2) achi speed ke liye GPU chahiye — aap ke laptop me NVIDIA GPU nahi, CPU par slow chalega; (3) voiceover ka kaam filhal PAUSED hai aap ke kehne par — ye future ke liye save hai, abhi istemal nahi ho raha.
  Saved: 16 Oct 2026 (Razia ki request par)

- **urdu-tts** (ahmedHanzala, 46 stars, MIT)
  https://github.com/ahmedHanzala/urdu-tts
  Urdu TTS + South-Asian accent voice cloning — Tortoise-TTS jo South-Asian accent dataset par fine-tuned hai. Urdu script samajhta hai, awaz clone karta hai. Weights open (HuggingFace: zohann/urdu-tts), free Colab demo, audio samples website par.
  Kaam: Urdu voiceover — jab voiceover dobara shuru ho, ye sab se promising candidate hai.
  Notes (imandari se): (1) Tortoise **bohat slow** hai — ye us ki mashhoor kamzori hai; (2) quality ke liye audio samples sun kar faisla karein (samples: https://ahmedhanzala.github.io/urdu-tts/); (3) voiceover filhal paused tha — Razia ne khud restart karne ko kaha (16 Oct 2026).
  Saved: 16 Oct 2026 (Razia ki request par — "yes add karden")

## 🎨 Web Design

- **freebies** (uisual, 465 stars, free for commercial use — no credit needed)
  https://github.com/uisual/freebies
  Free landing page templates — plain HTML/CSS (koi framework nahi), responsive, black & white wireframe style taake apne brand colors mein customize karo. Har hafta naya template.
  Kaam: mustaqbil mein naye landing pages (naye courses/offers) ke liye design inspiration ya bunyad.
  Notes (imandari se): (1) formal license file nahi — author kehta hai bech sakte ho, credit zaroori nahi; (2) templates saada (black & white) hain — design mehnat khud karni paregi; (3) site ke liye Muse hi pages banata hai, ye sirf design reference ke liye hai.
  Saved: 16 Oct 2026 (Razia ki request par — website-design topic se curated)
