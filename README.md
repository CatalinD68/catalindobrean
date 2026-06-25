# Cătălin Dobrean — Portfolio Website

Personal brand website built with React + Vite.

## Quick Start

```bash
npm install
npm run dev      # Development server → http://localhost:5173
npm run build    # Production build → ./dist
npm run preview  # Preview production build
```

## Deploy

### Vercel (Recommended)
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → Import project
3. Framework: **Vite** (auto-detected)
4. Deploy — done

### Netlify
1. Push to GitHub
2. Go to [netlify.com](https://netlify.com) → New site from Git
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy

### Manual
```bash
npm run build
# Upload the ./dist folder to any static host
```

## Customization

### Update your domain
Replace `catalindobrean.com` in:
- `index.html` (canonical, OG tags, structured data)
- `public/robots.txt` (sitemap URL)

### Add case study images
In `src/App.jsx`, find each project in `portfolioProjects.product` and fill the `images` array:
```js
images: [
  "/images/wesupply-1.png",
  "/images/wesupply-2.png",
  // ... add 4-5 images per project
],
```
Place image files in `public/images/`.

### Add OG image
Replace `public/og-image.png` with a 1200×630px social preview image.

### Assets included
- `public/avatar.png` — Profile photo
- `public/logo-white.svg` — Logo (white text)
- `public/logo-black.svg` — Logo (dark text)
- `public/favicon.svg` — Browser favicon
- `public/catalin-dobrean-cv.pdf` — Downloadable CV

## Tech Stack
- React 18
- Vite 6
- Lucide React (icons)
- Canvas API (kinetic grid)
- No CSS framework — custom inline styles
