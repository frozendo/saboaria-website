const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Advanced build configuration
const config = {
  sourceDir: '.',
  distDir: 'dist',
  files: {
    css: ['css/style.css', 'css/modal.css'],
    js: ['js/main.js'],
    html: ['index.html'],
    assets: ['images', 'webfonts', 'products.json']
  },
  // Image optimization settings
  imageOptimization: {
    enabled: true,
    quality: 85, // JPEG quality
    pngQuality: [0.65, 0.8], // PNG quality range
    formats: ['jpg', 'jpeg', 'png', 'gif', 'svg'],
    maxWidth: 1920,
    maxHeight: 1080
  }
};

// Utility functions
function log(message, type = 'info') {
  const colors = {
    info: '\x1b[36m',
    success: '\x1b[32m',
    error: '\x1b[31m',
    warning: '\x1b[33m',
    reset: '\x1b[0m'
  };
  console.log(`${colors[type]}${message}${colors.reset}`);
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyFile(src, dest) {
  if (fs.existsSync(src)) {
    if (fs.lstatSync(src).isDirectory()) {
      copyDir(src, dest);
    } else {
      fs.copyFileSync(src, dest);
    }
  }
}

function copyDir(src, dest) {
  ensureDir(dest);
  const files = fs.readdirSync(src);
  files.forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    copyFile(srcPath, destPath);
  });
}

// Image optimization function
function optimizeImages() {
  if (!config.imageOptimization.enabled) {
    log('Image optimization disabled', 'warning');
    return;
  }

  try {
    log('🖼️  Optimizing images...', 'info');
    
    const imageDir = path.join(config.distDir, 'images');
    if (!fs.existsSync(imageDir)) {
      log('No images directory found', 'warning');
      return;
    }

    // Install imagemin if not available
    try {
      execSync('which imagemin', { stdio: 'ignore' });
    } catch {
      log('Installing imagemin...', 'info');
      execSync('npm install -g imagemin-cli imagemin-mozjpeg imagemin-pngquant imagemin-gifsicle imagemin-svgo', { stdio: 'inherit' });
    }

    // Optimize images
    config.imageOptimization.formats.forEach(format => {
      const pattern = path.join(imageDir, `**/*.${format}`);
      try {
        execSync(`find ${imageDir} -name "*.${format}" -exec imagemin {} --out-dir=${imageDir} \\;`, { stdio: 'inherit' });
        log(`✓ Optimized ${format} images`, 'success');
      } catch (error) {
        log(`⚠️  Could not optimize ${format} images: ${error.message}`, 'warning');
      }
    });

    // Calculate image optimization stats
    const originalSize = calculateDirSize(path.join(config.sourceDir, 'images'));
    const optimizedSize = calculateDirSize(imageDir);
    const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    
    log(`📊 Image optimization: ${reduction}% size reduction`, 'success');
  } catch (error) {
    log(`✗ Image optimization failed: ${error.message}`, 'error');
  }
}

function calculateDirSize(dir) {
  if (!fs.existsSync(dir)) return 0;
  
  let totalSize = 0;
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);
    if (stat.isDirectory()) {
      totalSize += calculateDirSize(itemPath);
    } else {
      totalSize += stat.size;
    }
  });
  
  return totalSize;
}

// Enhanced minification functions with text processing
function minifyCSSWithProcessing(inputFile, outputFile) {
  try {
    const inputPath = path.join(config.sourceDir, inputFile);
    const outputPath = path.join(config.distDir, outputFile);
    
    if (!fs.existsSync(inputPath)) {
      log(`CSS file not found: ${inputPath}`, 'warning');
      return;
    }
    
    ensureDir(path.dirname(outputPath));
    
    // Read and process content
    let content = fs.readFileSync(inputPath, 'utf8');
    
    // Write processed content to temp file
    const tempFile = path.join(config.distDir, 'temp.css');
    fs.writeFileSync(tempFile, content);
    
    // Minify with clean-css
    const command = `npx clean-css-cli -o "${outputPath}" "${tempFile}"`;
    execSync(command, { stdio: 'inherit' });
    
    // Clean up temp file
    fs.unlinkSync(tempFile);
    
    const originalSize = fs.statSync(inputPath).size;
    const minifiedSize = fs.statSync(outputPath).size;
    const reduction = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
    
    log(`✓ Minified ${inputFile} (${reduction}% reduction)`, 'success');
  } catch (error) {
    log(`✗ Failed to minify ${inputFile}: ${error.message}`, 'error');
  }
}

function minifyJSWithProcessing(inputFile, outputFile) {
  try {
    const inputPath = path.join(config.sourceDir, inputFile);
    const outputPath = path.join(config.distDir, outputFile);
    
    if (!fs.existsSync(inputPath)) {
      log(`JS file not found: ${inputPath}`, 'warning');
      return;
    }
    
    ensureDir(path.dirname(outputPath));
    
    // Read and process content
    let content = fs.readFileSync(inputPath, 'utf8');
    
    // Write processed content to temp file
    const tempFile = path.join(config.distDir, 'temp.js');
    fs.writeFileSync(tempFile, content);
    
    // Minify with terser
    const command = `npx terser "${tempFile}" -o "${outputPath}" --compress --mangle`;
    execSync(command, { stdio: 'inherit' });
    
    // Clean up temp file
    fs.unlinkSync(tempFile);
    
    const originalSize = fs.statSync(inputPath).size;
    const minifiedSize = fs.statSync(outputPath).size;
    const reduction = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
    
    log(`✓ Minified ${inputFile} (${reduction}% reduction)`, 'success');
  } catch (error) {
    log(`✗ Failed to minify ${inputFile}: ${error.message}`, 'error');
  }
}

function minifyHTMLWithProcessing(inputFile, outputFile) {
  try {
    const inputPath = path.join(config.sourceDir, inputFile);
    const outputPath = path.join(config.distDir, outputFile);
    
    if (!fs.existsSync(inputPath)) {
      log(`HTML file not found: ${inputPath}`, 'warning');
      return;
    }
    
    // Read and process content
    let content = fs.readFileSync(inputPath, 'utf8');
    
    // Write processed content to temp file
    const tempFile = path.join(config.distDir, 'temp.html');
    fs.writeFileSync(tempFile, content);
    
    // Minify with html-minifier-terser
    const command = `npx html-minifier-terser --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --use-short-doctype --minify-css true --minify-js true "${tempFile}" -o "${outputPath}"`;
    execSync(command, { stdio: 'inherit' });
    
    // Clean up temp file
    fs.unlinkSync(tempFile);
    
    const originalSize = fs.statSync(inputPath).size;
    const minifiedSize = fs.statSync(outputPath).size;
    const reduction = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
    
    log(`✓ Minified ${inputFile} (${reduction}% reduction)`, 'success');
  } catch (error) {
    log(`✗ Failed to minify ${inputFile}: ${error.message}`, 'error');
  }
}

function updateHTMLReferences() {
  try {
    const htmlFile = path.join(config.distDir, 'index.html');
    if (!fs.existsSync(htmlFile)) {
      log('HTML file not found for reference updates', 'warning');
      return;
    }
    
    let content = fs.readFileSync(htmlFile, 'utf8');
    
    // Update CSS references
    content = content.replace(/css\/style\.css/g, 'css/style.min.css');
    content = content.replace(/css\/modal\.css/g, 'css/modal.min.css');
    
    // Update JS references
    content = content.replace(/js\/main\.js/g, 'js/main.min.js');
    
    fs.writeFileSync(htmlFile, content);
    log('✓ Updated HTML file references', 'success');
  } catch (error) {
    log(`✗ Failed to update HTML references: ${error.message}`, 'error');
  }
}

function copyAssets() {
  try {
    config.files.assets.forEach(asset => {
      const srcPath = path.join(config.sourceDir, asset);
      const destPath = path.join(config.distDir, asset);
      
      if (fs.existsSync(srcPath)) {
        copyFile(srcPath, destPath);
        log(`✓ Copied ${asset}`, 'success');
      } else {
        log(`Asset not found: ${asset}`, 'warning');
      }
    });
  } catch (error) {
    log(`✗ Failed to copy assets: ${error.message}`, 'error');
  }
}

function createBuildInfo() {
  try {
    const buildInfo = {
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      buildType: 'production',
      optimizations: {
        cssMinification: true,
        jsMinification: true,
        htmlMinification: true,
        imageOptimization: config.imageOptimization.enabled,
        textProcessing: true
      }
    };
    
    fs.writeFileSync(
      path.join(config.distDir, 'build-info.json'),
      JSON.stringify(buildInfo, null, 2)
    );
    
    log('✓ Created build info', 'success');
  } catch (error) {
    log(`✗ Failed to create build info: ${error.message}`, 'error');
  }
}

function calculateTotalSize() {
  try {
    let totalSize = 0;
    const files = [];
    
    function calculateDirSize(dir) {
      const items = fs.readdirSync(dir);
      items.forEach(item => {
        const itemPath = path.join(dir, item);
        const stat = fs.statSync(itemPath);
        if (stat.isDirectory()) {
          calculateDirSize(itemPath);
        } else {
          totalSize += stat.size;
          files.push(itemPath);
        }
      });
    }
    
    calculateDirSize(config.distDir);
    
    const sizeInKB = (totalSize / 1024).toFixed(2);
    const sizeInMB = (totalSize / (1024 * 1024)).toFixed(2);
    
    log(`📊 Build complete! Total size: ${sizeInKB} KB (${sizeInMB} MB)`, 'success');
    log(`📁 Files processed: ${files.length}`, 'info');
  } catch (error) {
    log(`✗ Failed to calculate build size: ${error.message}`, 'error');
  }
}

// Main build function with comprehensive optimization
function buildOptimized() {
  log('🚀 Starting optimized build process...', 'info');
  
  // Clean and create dist directory
  if (fs.existsSync(config.distDir)) {
    fs.rmSync(config.distDir, { recursive: true, force: true });
  }
  ensureDir(config.distDir);
  
  // Copy assets
  log('📁 Copying assets...', 'info');
  copyAssets();
  
  // Optimize images
  optimizeImages();
  
  // Process and minify CSS files
  log('🎨 Processing and minifying CSS files...', 'info');
  config.files.css.forEach(cssFile => {
    const outputFile = cssFile.replace('.css', '.min.css');
    minifyCSSWithProcessing(cssFile, outputFile);
  });
  
  // Process and minify JS files
  log('⚡ Processing and minifying JavaScript files...', 'info');
  config.files.js.forEach(jsFile => {
    const outputFile = jsFile.replace('.js', '.min.js');
    minifyJSWithProcessing(jsFile, outputFile);
  });
  
  // Process and minify HTML files
  log('📄 Processing and minifying HTML files...', 'info');
  config.files.html.forEach(htmlFile => {
    minifyHTMLWithProcessing(htmlFile, htmlFile);
  });
  
  // Update HTML references
  log('🔗 Updating HTML references...', 'info');
  updateHTMLReferences();
  
  // Create build info
  createBuildInfo();
  
  // Calculate and display build statistics
  calculateTotalSize();
  
  log('✅ Optimized build completed successfully!', 'success');
}

// Run build if this script is executed directly
if (require.main === module) {
  buildOptimized();
}

module.exports = { buildOptimized, config }; 