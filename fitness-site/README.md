# FitForge – Static Fitness Website

Deployable static website with calculators (TDEE, macros, BMI/body fat), fitness assessment, body type supplement suggestions, articles, and affiliate product page.

## Local preview

```bash
# from repo root
python3 -m http.server 8080 -d fitness-site
```
Then open http://localhost:8080

## Deploy
- Any static host: GitHub Pages, Netlify, Vercel, S3, Nginx.
- Point the host to the `fitness-site/` directory.
- Replace `YOURTAG-20` with your affiliate tag.
- Update `sitemap.xml` domain and `robots.txt` sitemap URL.

## Files
- `index.html` – landing with tools
- `styles.css` – styles
- `calculators.js` – calculators logic
- `supplements.js` – body type & assistant content
- `script.js` – chat widget and UI behaviors
- `products.html`, `articles.html`, `about.html`, `contact.html`
- `privacy.html`, `terms.html`, `affiliate-disclosure.html`
- `sitemap.xml`, `robots.txt`