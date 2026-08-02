/**
 * Post-build: give the Open Graph card a real .png extension.
 *
 * The problem
 * -----------
 * Next's file-based `opengraph-image.tsx` convention exports the rendered card
 * as an EXTENSIONLESS file (`out/opengraph-image`). Vercel sets the content
 * type from route metadata so it works there — but GitHub Pages serves purely
 * by file extension, and an extensionless file goes out as
 * `application/octet-stream`. LinkedIn, Slack, iMessage and X all silently drop
 * a preview whose content type isn't an image. That preview is the first thing
 * a recruiter sees when this link is shared, so it has to be right.
 *
 * Why rewrite the HTML rather than just set `openGraph.images` in metadata?
 * Because the file convention takes precedence over `openGraph.images` — the
 * metadata value is honoured for `twitter:image` but silently ignored for
 * `og:image`. Rewriting the emitted tag is the only way to keep BOTH the
 * generated card (so `opengraph-image.tsx` stays the editable source of truth,
 * regenerated on every build) AND a correctly-typed URL.
 *
 * Edit src/app/opengraph-image.tsx, rebuild, and everything downstream updates.
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const outDir = join(root, 'out');
const source = join(outDir, 'opengraph-image');

if (!existsSync(source)) {
  console.warn('[postbuild] out/opengraph-image not found — skipping.');
  process.exit(0);
}

// 1. Emit the card with an extension every static host understands.
//    public/ too, so the file is committed and present on the next dev run.
for (const dest of [join(outDir, 'og.png'), join(root, 'public', 'og.png')]) {
  mkdirSync(join(dest, '..'), { recursive: true });
  copyFileSync(source, dest);
}

// 2. Repoint every emitted og:image URL at it.
//    NOTE: build the regex per call. A /g regex reused with .test() carries
//    lastIndex between calls and would skip every other match.
const ogUrlPattern = () => /\/opengraph-image\?[a-z0-9]+/gi;
let patched = 0;

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      walk(path);
    } else if (entry.endsWith('.html') || entry.endsWith('.txt')) {
      const before = readFileSync(path, 'utf8');
      if (!before.includes('/opengraph-image?')) continue;
      writeFileSync(path, before.replace(ogUrlPattern(), '/og.png'), 'utf8');
      patched += 1;
    }
  }
}

walk(outDir);

console.log(`[postbuild] Wrote og.png (image/png) and repointed og:image in ${patched} file(s).`);
