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

# 2. Copy root static assets
for ext in ico svg txt webmanifest json xml jpg jpeg png webp avif; do
  for f in *.$ext; do
    [ -f "$f" ] && cp "$f" dist/ || true
  done
done

# 3. Copy _redirects and _headers
if [ -f "public/_redirects" ]; then
  cp public/_redirects dist/_redirects
  echo "✓ _redirects copied from public"
elif [ -f "_redirects" ]; then
  cp _redirects dist/_redirects
  echo "✓ _redirects copied from root"
fi
[ -f "_headers" ] && cp _headers dist/_headers || true
[ -f "public/_headers" ] && cp public/_headers dist/_headers || true

# 4. Copy public/ folder if exists
if [ -d "public" ]; then
  cp -r public/. dist/ 2>/dev/null || true
  mkdir -p dist/assets
  for f in public/*.jpg public/*.jpeg public/*.png public/*.webp public/*.avif; do
    [ -f "$f" ] && cp "$f" dist/assets/ && echo "✓ assets/$(basename "$f") from public" || true
  done
fi

# 5. Copy assets and _astro folders safely with /.
if [ -d "assets" ]; then
  mkdir -p dist/assets
  cp -r assets/. dist/assets/
  echo "✓ assets copied to dist/assets"
  # Also copy top-level images to root dist for root URLs (/og-image.jpg)
  for f in assets/*.jpg assets/*.jpeg assets/*.png assets/*.webp assets/*.avif; do
    [ -f "$f" ] && cp "$f" dist/ || true
  done
fi
[ -d "_astro" ] && mkdir -p dist/_astro && cp -r _astro/. dist/_astro/ && echo "✓ _astro"

# Ensure og-image.jpg and face-analysis-banner.jpg are present in both dist/ and dist/assets/
for img in og-image.jpg face-analysis-banner.jpg; do
  if [ -f "assets/$img" ]; then
    cp "assets/$img" "dist/assets/$img"
    cp "assets/$img" "dist/$img"
  elif [ -f "public/$img" ]; then
    cp "public/$img" "dist/assets/$img"
    cp "public/$img" "dist/$img"
  elif [ -f "$img" ]; then
    cp "$img" "dist/assets/$img"
    cp "$img" "dist/$img"
  fi
done

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
