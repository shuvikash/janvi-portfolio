# Janvi Kumari — Digital Banking OS

![Deploy](https://github.com/shuvikash/janvi-portfolio/actions/workflows/lighthouse.yml/badge.svg)

A premium personal portfolio for **Janvi Kumari**, Probationary Officer at **Bank of Maharashtra**, working in **Digital Banking & Branch Operations**.

It borrows the visual language and polish of a modern fintech operating system — glassmorphism, mesh gradients, an animated grid, ambient lighting and engineering-inspired storytelling — while clearly remaining a personal portfolio.

> **"Digital Banking OS"** is a creative branding/theme only. It is **not** an official job title. All logs, dashboards, repositories, workflows and metrics on the site are entirely **fictional and illustrative**.

## Live Demo

https://shuvikash.github.io/janvi-portfolio/

## Tech stack

- **HTML5** — semantic, accessible markup
- **Tailwind CSS** (CDN) — utility styling
- **Vanilla JavaScript** — all interactions, zero frameworks
- Custom `assets/css/styles.css` — the full design system

No React, Vue, Angular, Bootstrap or jQuery.

## Project structure

```
janvi-portfolio/
├── index.html
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   ├── images/og-cover.svg
│   └── icons/favicon.svg
├── robots.txt
├── sitemap.xml
├── site.webmanifest
└── README.md
```

## Sections

Loading experience → Hero → System Overview → Live Operations Terminal → Core Responsibilities → Featured Deployments → Continuous Improvements → Process Flow → Operational Dashboard → Career Timeline → Offline Mode → Contact (VS Code style modal) → Footer.

## Features

- Boot-style loading sequence + hero typing animation
- Animated grid, mesh gradients, floating particles, mouse spotlight, noise texture
- Scroll-reveal, counter animations, sticky navbar, scroll progress bar
- Interactive SVG system diagram
- Self-typing "live operations" terminal (fictional)
- Expandable responsibility cards & repository-style deployment cards
- Illustrative operational dashboard (animated bars + donut)
- Git-style career timeline
- VS Code-inspired contact modal with copy-to-clipboard
- SEO: title, meta description, Open Graph, Twitter Card, Person schema, sitemap, robots, web manifest, theme-color
- Accessibility: semantic HTML, ARIA, keyboard navigation, focus states, `prefers-reduced-motion`, responsive layout

## Run locally

It's a static site — just open `index.html`, or serve it:

```bash
# Python
python -m http.server 8080

# Node
npx serve .
```

Then visit `http://localhost:8080`.

## Deploy to GitHub Pages

1. Push the contents of this folder to the **root** of a repository (e.g. `janvikumari.github.io` for a user site).
2. In the repo: **Settings → Pages → Build and deployment → Deploy from a branch**, select `main` / `root`.
3. Update the absolute URLs in `index.html` (Open Graph / canonical), `robots.txt` and `sitemap.xml` if your Pages URL differs.

## Customization

- **Contact details:** edit the `contact.js` block and the `mailto:` / LinkedIn links in `index.html`.
- **Photo:** replace the `JK` avatar placeholder in the hero profile card with an `<img>`.
- **Colors / fonts:** tweak the CSS variables at the top of `assets/css/styles.css`.

---

Built with care. Personal portfolio only — no confidential banking data is represented.
