# Cătălin Dobrean Website — Setup Guide

Everything you need to go from the zip file to a live website.

---

## PART 1: Unzip & Open the Project

1. Download the `catalin-dobrean-website-deploy.zip` file
2. Unzip it into a folder on your computer (e.g. `Desktop/my-website`)
3. Open that folder — you should see these files:
   ```
   my-website/
   ├── public/
   ├── src/
   ├── index.html
   ├── package.json
   ├── vite.config.js
   └── ...
   ```

---

## PART 2: Replace Images

All placeholder images are `.txt` files. You delete the `.txt` and drop in a `.webp` with the same name.

### Tools you need

- Any image converter to `.webp` format
- Free options: Squoosh (squoosh.app), Convertio, or Figma export
- Keep each image under 200KB for fast loading

---

### A) Showcase Images (the scrolling gallery + contact slideshow)

**Location:** `public/images/showcase/`
**How many:** 12 images
**Size:** 600 × 800 pixels (3:4 portrait)

Steps:
1. Open `public/images/showcase/`
2. You'll see `1.txt`, `2.txt`, ... `12.txt`
3. Delete `1.txt`
4. Drop your image named `1.webp` in the same folder
5. Repeat for `2.webp` through `12.webp`

**What goes here:** Your best visual shots — UI screens, dashboards, app mockups, branding pieces. These appear in the "Visual Craft" scrolling gallery AND the contact section horizontal slideshow.

---

### B) Project Cover Images (case study cards)

**Location:** `public/images/covers/`
**How many:** 6 covers
**Size:** 1600 × 900 pixels (16:9 landscape)

Steps:
1. Open `public/images/covers/`
2. You'll see: `wesupply.txt`, `dreamtter.txt`, `urbanlab.txt`, `refracto.txt`, `fourthspace.txt`, `pan.txt`
3. Delete `wesupply.txt`
4. Drop your image named `wesupply.webp`
5. Repeat for each project

**What goes here:** One hero/cover image per project. This shows on the project card before expanding.

---

### C) Project Gallery Images (inside expanded case studies)

These show when someone clicks/expands a project card.

**Location:** Each project has its own folder
**How many:** 5 images per project
**Size:** 1600 × 900 pixels (16:9 landscape)

Projects with galleries:
- `public/images/wesupply/` → `1.webp` through `5.webp`
- `public/images/dreamtter/` → `1.webp` through `5.webp`
- `public/images/urbanlab/` → `1.webp` through `5.webp`
- `public/images/refracto/` → `1.webp` through `5.webp`

Steps (same for each folder):
1. Open e.g. `public/images/wesupply/`
2. Delete `1.txt`
3. Drop `1.webp`
4. Repeat for `2.webp` through `5.webp`
5. Do the same for the other 3 project folders

**What goes here:** Detailed screens, flows, components. Think: your Behance/case study images.

---

### D) Personal Project Grids

**Location:** `public/images/personal/talejewelry/` and `public/images/personal/visen/`
**How many:** 6 images per project
**Size:** 600 × 800 pixels (3:4 portrait)

Steps:
1. Open e.g. `public/images/personal/talejewelry/`
2. Delete `1.txt`, drop `1.webp`
3. Repeat for `2.webp` through `6.webp`
4. Do the same for `public/images/personal/visen/`

---

### E) Digital Design Covers

**Location:** `public/images/digital/{project-name}/`
**How many:** 1 image per project (9 projects)
**Size:** 1600 × 900 pixels (16:9 landscape)

Folders:
- `inventiff`, `redbee`, `selfit`, `dopodoheal`, `oriceinvitatie`
- `mindtune`, `forum01115`, `evointerior`, `roboticsvalley`

Steps:
1. Open e.g. `public/images/digital/inventiff/`
2. Delete `1.txt`
3. Drop `1.webp`
4. Repeat for each of the 9 project folders

---

### F) Your Avatar

**Already placed at:** `public/avatar.png`
To replace: just drop a new `avatar.png` in the same location (square, at least 400×400px).

---

### G) OG Image (social media preview)

**Location:** `public/og-image.png`
**Size:** 1200 × 630 pixels
This is what shows when someone shares your link on LinkedIn, Twitter, WhatsApp, etc.

You need to create this and drop it in `public/`.

---

## PART 3: Run the Website Locally (Test It)

### Install Node.js (if you don't have it)

1. Go to https://nodejs.org
2. Download the LTS version
3. Install it (just click Next through the installer)
4. Restart your terminal/command prompt

### Run the site

1. Open Terminal (Mac) or Command Prompt (Windows)
2. Navigate to your project folder:
   ```
   cd Desktop/my-website
   ```
3. Install dependencies (only needed once):
   ```
   npm install
   ```
4. Start the dev server:
   ```
   npm run dev
   ```
5. Open your browser and go to: `http://localhost:5173`
6. You should see your website! Check all pages, images, links.

To stop the server: press `Ctrl + C` in the terminal.

---

## PART 4: Update Your Domain

Before publishing, update the domain in these files:

### File: `index.html`
Find `catalindobrean.com` and replace with your actual domain.

### File: `public/robots.txt`
Find `catalindobrean.com` and replace with your actual domain.

### File: `public/sitemap.xml`
Find `catalindobrean.com` and replace with your actual domain.

---

## PART 5: Publish to Vercel (Recommended — Free)

### Option A: Using GitHub (recommended for updates)

1. **Create a GitHub account** at https://github.com (if you don't have one)

2. **Install Git** from https://git-scm.com

3. **Push your project to GitHub:**
   ```
   cd Desktop/my-website
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   git push -u origin main
   ```

4. **Go to https://vercel.com** and sign up with your GitHub account

5. Click **"Add New Project"**

6. Select your repository from the list

7. Vercel auto-detects Vite. Just click **"Deploy"**

8. Wait ~60 seconds. Your site is live at `your-project.vercel.app`

### Option B: Direct upload (no GitHub needed)

1. Build the site first:
   ```
   cd Desktop/my-website
   npm run build
   ```
   This creates a `dist/` folder.

2. **Install Vercel CLI:**
   ```
   npm install -g vercel
   ```

3. **Deploy:**
   ```
   vercel
   ```

4. Follow the prompts (login, project name). Your site goes live.

---

## PART 6: Connect Your Domain

1. In Vercel dashboard, go to your project → **Settings → Domains**

2. Type your domain (e.g. `catalindobrean.com`) and click **Add**

3. Vercel shows you DNS records to add. Go to your domain registrar (GoDaddy, Namecheap, Google Domains, etc.)

4. Add the DNS records Vercel tells you:
   - Usually an **A record** pointing to `76.76.21.21`
   - And a **CNAME** for `www` pointing to `cname.vercel-dns.com`

5. Wait 5-30 minutes for DNS to propagate

6. Your site is live at your domain with free HTTPS!

---

## PART 7: Making Future Updates

### If using GitHub + Vercel:
1. Edit your files locally
2. Test with `npm run dev`
3. Push to GitHub:
   ```
   git add .
   git commit -m "Updated images"
   git push
   ```
4. Vercel auto-deploys within ~60 seconds. Done!

### If using direct upload:
1. Rebuild: `npm run build`
2. Redeploy: `vercel --prod`

---

## Quick Reference — Image Sizes

| Type | Size | Aspect | Format | Location |
|------|------|--------|--------|----------|
| Showcase | 600 × 800 | 3:4 | .webp | showcase/ |
| Covers | 1600 × 900 | 16:9 | .webp | covers/ |
| Gallery | 1600 × 900 | 16:9 | .webp | {project}/ |
| Personal grids | 600 × 800 | 3:4 | .webp | personal/{project}/ |
| Digital covers | 1600 × 900 | 16:9 | .webp | digital/{project}/ |
| Avatar | 400+ × 400+ | 1:1 | .png | avatar.png |
| OG Image | 1200 × 630 | — | .png | og-image.png |

## Total Images to Replace: 59

- 12 showcase images
- 6 project covers
- 20 gallery images (4 projects × 5)
- 12 personal grids (2 projects × 6)
- 9 digital covers
