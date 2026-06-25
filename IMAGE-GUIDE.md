# How to Add Images — Complete Guide
## Cătălin Dobrean Portfolio Website

---

## Step 1: Prepare Your Images

### Recommended sizes
| Image Type | Size | Format | Max File Size |
|---|---|---|---|
| Project covers (16:9) | 1600×900px | .webp or .png | 200KB |
| Case study gallery (16:9) | 1600×900px | .webp or .png | 200KB |
| Digital design grid (3:4) | 600×800px | .webp or .png | 100KB |
| Personal project grid (3:4) | 600×800px | .webp or .png | 100KB |
| OG social preview | 1200×630px | .png | 300KB |

**Tip:** Use .webp for best compression. Squoosh.app is free for converting.

---

## Step 2: Put Images in the Right Folder

```
public/
  images/
    ├── covers/
    │   ├── wesupply-cover.webp
    │   ├── dreamtter-cover.webp
    │   ├── urbanlab-cover.webp
    │   └── refracto-cover.webp
    │
    ├── wesupply/
    │   ├── 1.webp
    │   ├── 2.webp
    │   ├── 3.webp
    │   ├── 4.webp
    │   └── 5.webp
    │
    ├── dreamtter/
    │   ├── 1.webp
    │   ├── 2.webp
    │   ├── 3.webp
    │   ├── 4.webp
    │   └── 5.webp
    │
    ├── urbanlab/
    │   └── ...
    │
    ├── refracto/
    │   └── ...
    │
    ├── digital/
    │   ├── inventiff-1.webp
    │   ├── inventiff-2.webp
    │   ├── inventiff-3.webp
    │   ├── inventiff-4.webp
    │   ├── inventiff-5.webp
    │   ├── inventiff-6.webp
    │   ├── redbee-1.webp
    │   └── ...
    │
    └── personal/
        ├── talejewelry-1.webp
        ├── talejewelry-2.webp
        └── ...
```

---

## Step 3: Edit src/App.jsx

Open `src/App.jsx` in any code editor (VS Code recommended).

---

### A) Product Design — Cover Image (16:9 banner)

**What it does:** The big image shown on each project card before expanding.

**Find:** Search for `id: "wesupply"` — you'll see:
```js
image: "https://mir-s3-cdn-cf.behance.net/projects/max_808/31e62a...",
```

**Replace with local image:**
```js
image: "/images/covers/wesupply-cover.webp",
```

**Do the same for each project:**
| Search for | Replace `image:` value |
|---|---|
| `id: "easypost"` | Has `noCover: true` — skip (no cover shown) |
| `id: "wesupply"` | `"/images/covers/wesupply-cover.webp"` |
| `id: "dreamtter"` | `"/images/covers/dreamtter-cover.webp"` |
| `id: "urbanlab"` | `"/images/covers/urbanlab-cover.webp"` |
| `id: "fourthspace"` | Has `noCover: true` — skip |
| `id: "refracto"` | `"/images/covers/refracto-cover.webp"` |
| `id: "pan"` | Has `noCover: true` — skip |

---

### B) Product Design — Gallery Images (5 images inside expanded card)

**What it does:** The 5 full-width 16:9 images shown when you click to expand a project.

**Find:** Search for `id: "wesupply"` — you'll see:
```js
images: [],
```

**Replace with:**
```js
images: [
  "/images/wesupply/1.webp",
  "/images/wesupply/2.webp",
  "/images/wesupply/3.webp",
  "/images/wesupply/4.webp",
  "/images/wesupply/5.webp",
],
```

**Do the same for each expandable project:**

| Search for | Replace `images:` array |
|---|---|
| `id: "wesupply"` | 5 images |
| `id: "dreamtter"` | 5 images |
| `id: "urbanlab"` | 5 images |
| `id: "refracto"` | 5 images |
| `id: "easypost"` | Has `noExpand: true` — skip |
| `id: "fourthspace"` | Has `noExpand: true` — skip |
| `id: "pan"` | Has `noExpand: true` — skip |

**Note:** You can add any number of images (3, 4, 5, 7...) — the grid adapts.

---

### C) Personal Projects — 2×3 Grid (6 images)

**Current behavior:** Shows 6 gradient placeholder boxes. The first box uses the Behance thumbnail, the rest are placeholders.

**To add your own images**, find `id: "talejewelry"` and `id: "visen"`. The component reads from a hardcoded grid, so you need to modify the `PersonalProjectCard` component.

**Find this block** (search for `function PersonalProjectCard`):
```jsx
{[0,1,2,3,4,5].map(j => (
  <div key={j} style={{
    aspectRatio: "3/4",
    background: p.image && j === 0
      ? `url(${p.image}) center/cover no-repeat`
      : `linear-gradient(...)`,
```

**To use your own 6 images per project, replace the whole grid block with:**
```jsx
{(p.gridImages || [0,1,2,3,4,5]).map((img, j) => (
  <div key={j} style={{
    aspectRatio: "3/4",
    background: typeof img === "string"
      ? `url(${img}) center/cover no-repeat`
      : `linear-gradient(${135 + j * 15}deg, rgba(255,255,255,${0.025 + j * 0.006}), rgba(255,255,255,0.008))`,
    display: "flex", alignItems: "center", justifyContent: "center",
  }}>
    {typeof img !== "string" && (
      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.1)", fontFamily: "var(--font-mono)" }}>{j + 1}</span>
    )}
  </div>
))}
```

**Then add `gridImages` to the project data:**
```js
{
  id: "talejewelry",
  title: "Tale Jewelry",
  // ...existing fields...
  gridImages: [
    "/images/personal/talejewelry-1.webp",
    "/images/personal/talejewelry-2.webp",
    "/images/personal/talejewelry-3.webp",
    "/images/personal/talejewelry-4.webp",
    "/images/personal/talejewelry-5.webp",
    "/images/personal/talejewelry-6.webp",
  ],
},
```

---

### D) Digital Design — 2×3 Grid (6 images per project)

**Same approach as Personal Projects.** Find `portfolioProjects.digital` and the rendering block.

**Find this block** (search for `portfolioProjects.digital.map`):
```jsx
{[0,1,2,3,4,5].map(j => (
  <div key={j} style={{
    aspectRatio: "3/4",
    background: `linear-gradient(...)`,
```

**Replace with:**
```jsx
{(p.gridImages || [0,1,2,3,4,5]).map((img, j) => (
  <div key={j} style={{
    aspectRatio: "3/4",
    background: typeof img === "string"
      ? `url(${img}) center/cover no-repeat`
      : `linear-gradient(${135 + j * 15}deg, rgba(255,255,255,${0.025 + j * 0.006}), rgba(255,255,255,0.008))`,
    display: "flex", alignItems: "center", justifyContent: "center",
  }}>
    {typeof img !== "string" && (
      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.1)", fontFamily: "var(--font-mono)" }}>{j + 1}</span>
    )}
  </div>
))}
```

**Then add `gridImages` to each digital project:**
```js
{ id: "inventiff", title: "Inventiff", type: "Web Design", tag: "Web",
  gridImages: [
    "/images/digital/inventiff-1.webp",
    "/images/digital/inventiff-2.webp",
    "/images/digital/inventiff-3.webp",
    "/images/digital/inventiff-4.webp",
    "/images/digital/inventiff-5.webp",
    "/images/digital/inventiff-6.webp",
  ],
},
```

---

### E) Using Behance URLs Instead of Local Files

If you prefer not to host images locally, right-click any image on your Behance project page → "Open image in new tab" → copy the URL.

Behance URLs look like:
```
https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/abc123.jpg
```

Use `max_1200` in the URL (not `max_3840` or `fs`) for good quality without heavy load.

**Use the same way as local paths:**
```js
images: [
  "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/abc123.jpg",
  "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/def456.jpg",
],
```

---

## Quick Checklist

- [ ] Create `public/images/` folder structure
- [ ] Export images at recommended sizes
- [ ] Convert to .webp (use squoosh.app)
- [ ] Add cover images → `image: "/images/covers/..."` in project data
- [ ] Add gallery images → `images: ["/images/...", ...]` in project data
- [ ] Update PersonalProjectCard grid to read `gridImages`
- [ ] Update Digital Design grid to read `gridImages`
- [ ] Add `gridImages: [...]` to personal + digital project data
- [ ] Add `public/og-image.png` (1200×630) for social sharing
- [ ] Test locally with `npm run dev`
- [ ] Deploy
