#!/bin/bash
set -e

echo "=== Build Starting ==="

# Clean dist
rm -rf dist
mkdir -p dist

# Copy HTML files
echo "Copying HTML..."
for f in *.html; do
  [ -f "$f" ] && cp "$f" dist/ || true
done

# Copy root assets
echo "Copying root assets..."
for ext in ico svg txt webmanifest json xml; do
  for f in *.$ext; do
    [ -f "$f" ] && cp "$f" dist/ || true
  done
done

# Copy special Cloudflare configuration files
[ -f "_redirects" ] && cp "_redirects" dist/_redirects || true
[ -f "_headers" ] && cp "_headers" dist/_headers || true

# Copy public folder
if [ -d "public" ]; then
  echo "Copying public..."
  cp -r public dist/
  rm -f dist/public/_redirects
fi

# Copy folders
echo "Copying folders..."
for d in _astro assets face-shape hairstyles research; do
  if [ -d "$d" ]; then
    cp -r "$d" dist/ && echo "  ✓ $d copied"
  else
    echo "  ✗ $d NOT FOUND"
  fi
done

# Add content-hash cache busting for _astro files in dist/
echo "Applying content hashes to _astro assets..."
node -e '
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const astroDir = path.join("dist", "_astro");
const files = fs.readdirSync(astroDir);
const renameMap = new Map();

// First pass: compute content hash for each _astro file and create hashed copy
for (const file of files) {
  const fullPath = path.join(astroDir, file);
  if (!fs.statSync(fullPath).isFile()) continue;
  const content = fs.readFileSync(fullPath);
  const hash = crypto.createHash("sha256").update(content).digest("base64url").slice(0, 8);
  const parsed = path.parse(file);
  // Replace existing trailing hash segment before extension (e.g. Name.OldHash.js -> Name.NewHash.js)
  const baseParts = parsed.name.split(".");
  if (baseParts.length > 1) {
    baseParts[baseParts.length - 1] = hash;
  } else {
    baseParts.push(hash);
  }
  const hashedName = baseParts.join(".") + parsed.ext;
  if (hashedName !== file) {
    renameMap.set(file, hashedName);
    fs.copyFileSync(fullPath, path.join(astroDir, hashedName));
  }
}

function walkFiles(dir) {
  let out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkFiles(full));
    else if (entry.name.endsWith(".html") || entry.name.endsWith(".js")) out.push(full);
  }
  return out;
}

// Second pass: update references in all dist HTML and JS files to use hashed filenames
for (const targetFile of walkFiles("dist")) {
  let text = fs.readFileSync(targetFile, "utf8");
  let changed = false;
  for (const [origName, hashedName] of renameMap.entries()) {
    if (text.includes(origName)) {
      text = text.split(origName).join(hashedName);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(targetFile, text, "utf8");
  }
}
console.log("  ✓ Generated", renameMap.size, "content-hashed _astro files");
'

# Verify
echo ""
echo "=== Build Verification ==="
echo "Total files in dist/:"
find dist -type f | wc -l
echo ""
echo "Root of dist/:"
ls dist/
echo ""
echo "=== Build Complete ==="
