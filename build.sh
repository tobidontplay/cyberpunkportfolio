#!/bin/bash
# Simple build script for static site
echo "Building static site..."
# No build process needed for plain HTML/CSS/JS
# Just ensure all files are in the right place
mkdir -p public
cp -r *.html *.css *.js public/ 2>/dev/null || true
echo "Build completed!"
