# Razia Azeem Official — Islamic Blog

Razia Azeem's personal Islamic blog website: fresh daily blogs on Quran & Hadith, Islamic stories, duas and motivation.
Every article is grounded in authentic sources — Quran with surah:ayat references and Hadith with book references.
Homepage includes the blog teaser grid, a social connect section, and a contact section (email, YouTube, WhatsApp for online classes).

**v4 (Oct 15, 2026):** blog-only redesign — all tutoring features removed (tutor listings, subject search, Ustadh Compass, AI tools, chatbot, become-a-tutor, requirement drafts). Site rebranded to "Razia Azeem Official".

## Tech

Plain static site — **no build step**:

- `index.html` — homepage: hero, blog teasers, social connect, contact
- `styles.css` — full styling (golden/navy theme, Poppins, responsive)
- `app.js` — contact form handler only
- `blog.html` — blog index
- `posts/` — SEO-friendly articles
- `sitemap.xml`, `robots.txt` — SEO

Daily auto-blog pipeline (in `../blog-pipeline/`) publishes new posts via 4 daily crons.

## Deploy on Vercel (free)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **Add New → Project** and import the `ustadh-hub` repository.
3. Framework preset: **Other** (no build command, no output directory needed — `index.html` is at the root).
4. Click **Deploy**. Done — every future `git push` to `main` redeploys automatically.

## Local preview

Just open `index.html` in a browser, or run:

```bash
npx serve .
```
