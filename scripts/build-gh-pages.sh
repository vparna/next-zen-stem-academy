#!/bin/bash -euo pipefail
# Build script for GitHub Pages deployment
# This temporarily moves API routes and dynamic routes since GitHub Pages doesn't support server-side code

echo "Starting GitHub Pages build..."

# Backup API directory outside of app
if [ -d "app/api" ]; then
  echo "Backing up API directory..."
  mv app/api ./api-backup-temp
fi

# Backup dynamic course detail route
if [ -d "app/courses/[id]" ]; then
  echo "Backing up dynamic course detail route..."
  mv "app/courses/[id]" ./course-detail-backup-temp
fi

# Run Next.js build
echo "Building Next.js app..."
npm run build

# Restore API directory
if [ -d "./api-backup-temp" ]; then
  echo "Restoring API directory..."
  mv ./api-backup-temp app/api
fi

# Restore dynamic course detail route
if [ -d "./course-detail-backup-temp" ]; then
  echo "Restoring dynamic course detail route..."
  mv ./course-detail-backup-temp "app/courses/[id]"
fi

echo "Build complete!"
