# UstadhHub — Find Trusted Tutors

A TeacherOn-style tutoring marketplace website: students search subjects, compare tutor profiles, calculate a teaching-fit match, post learning requirements, and tutors can build their profiles. Contact section included.

## Tech

Plain static site — **no build step**:

- `index.html` — all pages/sections in one file
- `styles.css` — full styling (light + dark mode, responsive)
- `app.js` — search filters, tutor profile modal, Ustadh Compass match calculator, requirement/profile builders, contact form
- `assets/` — hero image + tutor portraits (`.webp`)

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
