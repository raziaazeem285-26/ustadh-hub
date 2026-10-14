# UstadhHub — Find Trusted Online & Home Tutors in Pakistan

A TeacherOn-style tutoring marketplace website: students search subjects, compare tutor profiles, calculate a teaching-fit match, post learning requirements, and tutors can build their profiles. Contact section included.

**v2 (Oct 14, 2026):** golden + dark blue professional redesign with Poppins font, full SEO (meta/OG/JSON-LD/sitemap/robots), free AI tools (fee calculator + study planner), rule-based chatbot widget, and a blog with 3 learning guides.

## Tech

Plain static site — **no build step**:

- `index.html` — homepage: hero, subjects, tutor listings, Ustadh Compass, AI tools, blog teasers, become-a-tutor, contact
- `styles.css` — full styling (golden/navy theme, Poppins, responsive)
- `app.js` — search filters, tutor profile modal, Ustadh Compass, fee calculator, study planner, chatbot, requirement/profile builders, contact form
- `blog.html` — blog index
- `posts/` — 3 SEO-friendly articles (online vs home tuition, choosing an online tutor, online class success tips)
- `sitemap.xml`, `robots.txt` — SEO

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

## Note

Concept demo: tutor names, reviews, availability and prices shown on the site are fictional.
