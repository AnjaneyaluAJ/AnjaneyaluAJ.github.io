# AnjaneyaluAJ.github.io

Personal site of Anjaneyalu T. Static HTML, CSS and a little JavaScript, with no build step and no dependencies
beyond Google Fonts.

```
index.html            the whole page (edit content here)
assets/style.css      styles; colours are tokens at the top, dark mode right below
assets/main.js        theme toggle, mobile menu, talk filters
assets/hero-phoenix.jpg  hero photo (4:5 crop of the Phoenix talk)
assets/aj-hero.jpg    portrait (4:5 crop, used in the preview image)
assets/aj.jpg         square portrait (used in Google's structured data)
assets/charts/        result charts copied from llm-pretraining/results
assets/og-image.png   1200×630 link-preview image for LinkedIn and others
assets/talks/         put event photos here
tools/og-image.html   source for og-image.png
.nojekyll             tells GitHub Pages to serve the files as they are
```

Preview locally: `python3 -m http.server` in this folder, then open http://localhost:8000.

## Deploy to GitHub Pages in 4 steps

1. **Create the repository.** On GitHub, create a **public** repository named exactly `AnjaneyaluAJ.github.io`.
2. **Push these files** to its `main` branch:
   ```bash
   git init -b main
   git add .
   git commit -m "Initial site"
   git remote add origin https://github.com/AnjaneyaluAJ/AnjaneyaluAJ.github.io.git
   git push -u origin main
   ```
3. **Turn on Pages.** Repository → **Settings → Pages** → *Source*: **Deploy from a branch**, *Branch*:
   **main** / **(root)** → **Save**. After a minute or two the site is live at https://anjaneyaluaj.github.io/.
4. **Connect a custom domain (optional).** Buy the domain (e.g. `anjaneyalu.dev`), then at your registrar add:
   - four **A** records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - one **CNAME** record for `www` → `anjaneyaluaj.github.io`

   In **Settings → Pages → Custom domain**, enter `anjaneyalu.dev` and save (GitHub adds a `CNAME` file to the
   repository; run `git pull` before you push again). Once the DNS check passes, tick **Enforce HTTPS**. Finally,
   replace `https://anjaneyaluaj.github.io/` with your domain in `index.html` (canonical, OpenGraph and Twitter
   tags, JSON-LD), `robots.txt` and `sitemap.xml`.

   `.dev` and `.ai` domains only work over HTTPS, so wait for the certificate before sharing the link.

## Still to fill in

Search `index.html` for `TODO`, `PHOTO:` and `placeholder-link`:

- to change the portrait, replace `assets/aj-hero.jpg` (4:5) and `assets/aj.jpg` (square), then regenerate the preview image (see below)
- slide and event-post links for each talk, and links to the series write-ups once they're published

To add a talk, copy the commented template at the end of the Academic group in `index.html`.

## Regenerate the link-preview image

After editing `tools/og-image.html`:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --hide-scrollbars \
  --window-size=1200,630 --virtual-time-budget=4000 \
  --screenshot="$(pwd)/assets/og-image.png" "file://$(pwd)/tools/og-image.html"
```

LinkedIn caches previews. After you change the image, run the URL through https://www.linkedin.com/post-inspector/
to refresh it.
