#!/bin/bash

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
for ext in ico svg txt webmanifest json; do
  for f in *.$ext; do
    [ -f "$f" ] && cp "$f" dist/ || true
  done
done

# Copy folders
echo "Copying folders..."
for d in _astro assets face-shape hairstyles research; do
  if [ -d "$d" ]; then
    cp -r "$d" dist/ && echo "  ✓ $d copied"
  else
    echo "  ✗ $d NOT FOUND"
  fi
done

# Rewrite URLs
echo "Rewriting URLs..."
find dist -name "*.html" -exec sed -i 's|https://airateface.com/|/|g' {} \; 2>/dev/null || true

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
