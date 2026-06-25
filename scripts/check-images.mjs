#!/usr/bin/env node
/**
 * Verifies every "/images/..." path referenced in src/ exists in public/
 * with EXACT case. Vercel runs on Linux (case-sensitive); macOS/Windows
 * are not, so case mismatches only break in production.
 *
 * Exits with code 1 on missing files so `vite build` aborts.
 */
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = process.cwd();
const PUBLIC_DIR = join(ROOT, "public");
const SRC_DIR = join(ROOT, "src");

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

// Build a case-sensitive set of every file actually present in public/
const publicFiles = new Set(
  walk(PUBLIC_DIR).map((p) => "/" + relative(PUBLIC_DIR, p).split(sep).join("/"))
);

// Also build a lowercase index so we can detect case mismatches
const lowerIndex = new Map();
for (const f of publicFiles) lowerIndex.set(f.toLowerCase(), f);

// Scan src/ for image-like string literals
const srcFiles = walk(SRC_DIR).filter((p) => /\.(jsx?|tsx?|css)$/.test(p));
const refRe = /["'`](\/images\/[^"'`\s)]+\.(?:png|jpe?g|webp|avif|gif|svg))["'`]/gi;

const missing = [];
const caseMismatch = [];
const seen = new Set();

for (const file of srcFiles) {
  const content = readFileSync(file, "utf8");
  let m;
  while ((m = refRe.exec(content)) !== null) {
    const ref = m[1];
    if (seen.has(ref)) continue;
    seen.add(ref);

    if (publicFiles.has(ref)) continue;
    const lower = ref.toLowerCase();
    if (lowerIndex.has(lower)) {
      caseMismatch.push({ ref, actual: lowerIndex.get(lower), file });
    } else {
      missing.push({ ref, file });
    }
  }
}

if (missing.length === 0 && caseMismatch.length === 0) {
  console.log(`✓ image-check: all ${seen.size} referenced images exist in public/`);
  process.exit(0);
}

if (caseMismatch.length) {
  console.error("\n✗ CASE MISMATCH (will 404 on Vercel/Linux):");
  for (const { ref, actual } of caseMismatch) {
    console.error(`   code: ${ref}`);
    console.error(`   file: ${actual}`);
    console.error("");
  }
}

if (missing.length) {
  console.error(`\n✗ MISSING (${missing.length} images not found in public/):`);
  for (const { ref } of missing) console.error(`   ${ref}`);
}

console.error("\nFix the paths above (or add the files) then re-run the build.\n");
process.exit(1);
