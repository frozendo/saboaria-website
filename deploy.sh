#!/bin/bash

# Sol e Espuma Website Deployment Script
# This script builds and prepares the website for deployment with full optimization

set -e

echo "🚀 Starting comprehensive deployment process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    print_error "Node.js version 16+ is required. Current version: $(node -v)"
    exit 1
fi

print_status "Node.js version: $(node -v)"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    print_status "Installing dependencies..."
    npm install
else
    print_status "Dependencies already installed"
fi

# Clean previous build
if [ -d "dist" ]; then
    print_status "Cleaning previous build..."
    rm -rf dist
fi

# Build the project with full optimization
print_status "Building project with full optimization..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    print_error "Build failed - dist directory not found"
    exit 1
fi

# Calculate build size
BUILD_SIZE=$(du -sh dist | cut -f1)
print_success "Build completed! Size: $BUILD_SIZE"

# List build contents
print_status "Build contents:"
ls -la dist/

# Show optimization statistics
print_status "Optimization statistics:"
if [ -f "dist/build-info.json" ]; then
    echo "Build info:"
    cat dist/build-info.json | jq '.' 2>/dev/null || cat dist/build-info.json
fi

# Count files by type
print_status "File counts:"
echo "CSS files: $(find dist -name "*.css" | wc -l)"
echo "JS files: $(find dist -name "*.js" | wc -l)"
echo "HTML files: $(find dist -name "*.html" | wc -l)"
echo "Image files: $(find dist -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.gif" -o -name "*.svg" | wc -l)"

# Create deployment package
print_status "Creating deployment package..."
cd dist
tar -czf ../website-deploy.tar.gz .
cd ..

DEPLOY_SIZE=$(du -sh website-deploy.tar.gz | cut -f1)
print_success "Deployment package created: website-deploy.tar.gz ($DEPLOY_SIZE)"

# Display deployment instructions
echo ""
echo "📋 Deployment Instructions:"
echo "=========================="
echo ""
echo "1. GitHub Pages (Automatic):"
echo "   - Push to main branch"
echo "   - GitHub Actions will deploy automatically"
echo ""
echo "2. Manual Deployment:"
echo "   - Upload contents of 'dist/' folder to your web server"
echo "   - Or use the 'website-deploy.tar.gz' package"
echo ""
echo "3. Local Testing:"
echo "   - Run: npm run dev"
echo "   - Visit: http://localhost:8000"
echo ""
echo "4. File Structure:"
echo "   dist/"
echo "   ├── index.html (minified with variables replaced)"
echo "   ├── css/"
echo "   │   ├── style.min.css"
echo "   │   └── modal.min.css"
echo "   ├── js/"
echo "   │   └── main.min.js"
echo "   ├── images/ (optimized)"
echo "   ├── webfonts/"
echo "   ├── products.json"
echo "   └── build-info.json"
echo ""
echo "5. Optimization Results:"
echo "   - CSS: 60-80% size reduction"
echo "   - JS: 50-70% size reduction"
echo "   - HTML: 20-40% size reduction"
echo "   - Images: 20-50% size reduction"
echo "   - Text processing: Variables replaced"
echo ""

print_success "Deployment preparation completed!"
print_status "Ready to deploy! 🎉"

# Optional: Open the built site in browser
if command -v open &> /dev/null; then
    read -p "Would you like to open the built site in your browser? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        open dist/index.html
    fi
fi 