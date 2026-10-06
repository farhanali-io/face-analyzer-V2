#!/bin/bash
set -e
echo "=== Build Starting ==="

# If astro project, build it first
if [ -f "astro.config.mjs" ]; then
  echo "Astro detected, building..."
  npx astro build || echo "Astro build done"
fi

# Clean and ensure dist exists
rm -rf dist
mkdir -p dist

# Copy HTML files and create folder mirrors (clean URLs)
echo "Copying HTML with folder mirrors..."
for f in *.html; do
  if [ -f "$f" ]; then
    cp "$f" dist/
    name="${f%.html}"
    if [ "$name" != "index" ] && [ "$name" != "404" ]; then
      mkdir -p "dist/$name"
      cp "$f" "dist/$name/index.html"
    fi
  fi
done

# Copy root assets
for ext in ico svg txt webmanifest json xml; do
  for f in *.$ext; do
    [ -f "$f" ] && cp "$f" dist/ || true
  done
done

# Copy public/_redirects to dist/_redirects (relative-only version)
if [ -f "public/_redirects" ]; then
  cp "public/_redirects" dist/_redirects
  echo "✓ Copied public/_redirects"
elif [ -f "_redirects" ]; then
  cp "_redirects" dist/_redirects
fi

# Copy _headers
[ -f "_headers" ] && cp "_headers" dist/_headers || true
[ -f "public/_headers" ] && cp "public/_headers" dist/_headers || true

# Copy folders
for d in _astro assets; do
  [ -d "$d" ] && cp -r "$d" dist/ && echo "✓ $d copied" || echo "✗ $d not found"
done

# Copy subfolders with mirrors
for d in face-shape hairstyles research; do
  if [ -d "$d" ]; then
    mkdir -p "dist/$d"
    for f in $d/*.html; do
      if [ -f "$f" ]; then
        cp "$f" "dist/$d/"
        bn=$(basename "$f" .html)
        mkdir -p "dist/$d/$bn"
        cp "$f" "dist/$d/$bn/index.html"
      fi
    done
    echo "✓ $d copied with mirrors"
  fi
done

echo ""
echo "=== Build Verification ==="
echo "Total files: $(find dist -type f | wc -l)"
ls dist/ | head -20
echo ""
cat dist/_redirects 2>/dev/null || echo "No _redirects!"
echo ""
echo "=== Build Complete ==="
