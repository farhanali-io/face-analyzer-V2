#!/bin/bash
set -e
echo "=== Build Starting ==="
rm -rf dist
mkdir -p dist

# 1. Copy root HTML with mirrors
for f in *.html; do
  [ -f "$f" ] || continue
  cp "$f" dist/
  name="${f%.html}"
  if [ "$name" != "index" ] && [ "$name" != "404" ]; then
    mkdir -p "dist/$name"
    cp "$f" "dist/$name/index.html"
  fi
done

# 2. Copy assets
for ext in ico svg txt webmanifest json xml; do
  for f in *.$ext; do
    [ -f "$f" ] && cp "$f" dist/ || true
  done
done

# 3. Copy _redirects relative-only
if [ -f "public/_redirects" ]; then
  cp public/_redirects dist/_redirects
  echo "✓ _redirects copied"
fi
[ -f "_headers" ] && cp _headers dist/_headers || true
[ -f "public/_headers" ] && cp public/_headers dist/_headers || true

# 3b. Copy OG images and public images - THIS WAS MISSING
if [ -d "public" ]; then
  for f in public/*.jpg public/*.jpeg public/*.png public/*.webp public/*.avif; do
    [ -f "$f" ] && cp "$f" dist/ && echo "✓ $(basename $f) from public/" || true
  done
  # also copy to dist/assets for compatibility
  mkdir -p dist/assets
  for f in public/*.jpg public/*.jpeg public/*.png public/*.webp public/*.avif; do
    [ -f "$f" ] && cp "$f" dist/assets/ && echo "✓ assets/$(basename $f)" || true
  done
fi

# 4. Copy _astro and assets folders
[ -d "_astro" ] && cp -r _astro dist/ && echo "✓ _astro"
[ -d "assets" ] && cp -r assets dist/ && echo "✓ assets"

# 5. Research - FIXED with deep mirrors
echo "Copying research with mirrors..."
if [ -d "research" ]; then
  mkdir -p dist/research
  for f in research/*.html; do
    [ -f "$f" ] || continue
    bn=$(basename "$f" .html)
    cp "$f" dist/research/
    mkdir -p "dist/research/$bn"
    cp "$f" "dist/research/$bn/index.html"
    echo "  ✓ research/$bn"
  done
fi

# 6. Other subfolders
for d in face-shape hairstyles; do
  if [ -d "$d" ]; then
    mkdir -p "dist/$d"
    for f in $d/*.html; do
      [ -f "$f" ] || continue
      bn=$(basename "$f" .html)
      cp "$f" "dist/$d/"
      mkdir -p "dist/$d/$bn"
      cp "$f" "dist/$d/$bn/index.html"
    done
  fi
done

echo ""
echo "Total: $(find dist -type f | wc -l) files"
echo "Research check:"
ls -R dist/research | head -30
echo ""
ls -lh dist/*.jpg dist/assets/*.jpg 2>&1 | head -20
echo ""
cat dist/_redirects
echo ""
echo "=== Build Complete ==="
