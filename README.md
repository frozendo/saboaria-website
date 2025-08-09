# Sol e Espuma Saboaria Website

A beautiful, responsive website for Sol e Espuma Saboaria with advanced build optimization, text processing, and image optimization.

## 🚀 Features

- **Responsive Design**: Optimized for all devices
- **Performance Optimized**: Minified CSS, JS, and HTML
- **Advanced Text Processing**: Variable replacement in all file types
- **Image Optimization**: Automatic image compression without quality loss
- **Accessibility**: WCAG compliant with proper ARIA labels
- **SEO Optimized**: Meta tags, Open Graph, and structured data
- **Modern Build System**: Automated minification and deployment
- **GitHub Actions**: Automatic builds and deployment

## 📁 Project Structure

```
saboaria-website/
├── css/
│   ├── style.css          # Main stylesheet
│   └── modal.css          # Modal styles
├── js/
│   └── main.js            # Main JavaScript
├── images/                # Image assets (automatically optimized)
├── webfonts/              # Custom fonts
├── index.html             # Main HTML file
├── products.json          # Product data
├── build-optimized.js     # Advanced build script
├── package.json           # Dependencies
├── .github/workflows/     # GitHub Actions
└── dist/                  # Build output (generated)
```

## 🛠️ Development

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/saboaria-website.git
cd saboaria-website
```

2. Install dependencies:
```bash
npm install
```

### Available Scripts

#### Build Commands:
- `npm run build` - Full optimized build with text processing and image optimization
- `npm run build:simple` - Simple build using individual commands
- `npm run test-build` - Test the build process

#### Development Commands:
- `npm run dev` - Build and serve locally
- `npm run preview` - Build and open in browser
- `npm run serve` - Serve the dist folder locally

#### Utility Commands:
- `npm run deploy` - Prepare for deployment
- `npm run optimize-images` - Optimize images only
- `npm run clean` - Clean dist folder

### Local Development

1. Make your changes to the source files
2. Run the optimized build:
```bash
npm run build
```

3. Preview the build:
```bash
npm run preview
```

4. For development with live server:
```bash
npm run dev
```

## 🔧 Advanced Text Processing

The build system includes powerful text processing capabilities:

### Variable Replacement

Use variables in your HTML, CSS, and JS files:

```html
<!-- In HTML -->
<title>{{SITE_NAME}} - {{SITE_DESCRIPTION}}</title>
<p>Contact: {{CONTACT_PHONE}}</p>
```

```css
/* In CSS */
.site-name::before {
  content: "{{SITE_NAME}}";
}
```

```javascript
// In JavaScript
const siteName = "{{SITE_NAME}}";
const contactPhone = "{{CONTACT_PHONE}}";
```

### Available Variables

- `{{SITE_NAME}}` - Sol e Espuma Saboaria
- `{{SITE_DESCRIPTION}}` - Produtos Artesanais 100% Naturais
- `{{CONTACT_PHONE}}` - (16) 98809-9057
- `{{CONTACT_EMAIL}}` - sol.espuma@gmail.com
- `{{INSTAGRAM}}` - @soleespuma
- `{{FACEBOOK}}` - @solespuma
- `{{YEAR}}` - Current year (auto-updated)
- `{{BUILD_DATE}}` - Build date (auto-updated)

### Text Processing Features

1. **Variable Replacement**: Automatically replaces variables with actual values
2. **Comment Removal**: Removes unnecessary comments from HTML, CSS, and JS
3. **Whitespace Optimization**: Removes extra whitespace and newlines
4. **Inline Processing**: Minifies inline styles and scripts
5. **Content Optimization**: Optimizes text content for better performance

## 🖼️ Image Optimization

The build system automatically optimizes images without losing quality:

### Supported Formats
- **JPEG**: Optimized with mozjpeg for best compression
- **PNG**: Optimized with pngquant for transparency support
- **GIF**: Optimized with gifsicle for animation support
- **SVG**: Optimized with svgo for vector graphics

### Optimization Features
- **Quality Preservation**: Maintains visual quality while reducing file size
- **Progressive Enhancement**: JPEGs are converted to progressive format
- **Metadata Stripping**: Removes unnecessary metadata
- **Size Reporting**: Shows optimization statistics

### Typical Results
- **JPEG**: 20-40% size reduction
- **PNG**: 30-50% size reduction
- **GIF**: 10-30% size reduction
- **SVG**: 15-35% size reduction

## 🚀 Deployment

### GitHub Pages (Automatic)

The project includes a GitHub Action that automatically builds and deploys to GitHub Pages when you push to the main branch.

1. Enable GitHub Pages in your repository settings
2. Push to main branch - deployment happens automatically

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. The optimized files will be in the `dist/` folder
3. Upload the contents of `dist/` to your web server

### Build Output

The build process creates:

- **Minified CSS**: `dist/css/style.min.css`, `dist/css/modal.min.css`
- **Minified JS**: `dist/js/main.min.js`
- **Minified HTML**: `dist/index.html` (with variables replaced)
- **Optimized Images**: All images in `dist/images/` are optimized
- **Assets**: Copied fonts and data files
- **Build Info**: `dist/build-info.json` with build metadata

## 📊 Performance

The build system optimizes your site by:

- **CSS Minification**: 60-80% size reduction
- **JS Minification**: 50-70% size reduction  
- **HTML Minification**: 20-40% size reduction
- **Text Processing**: Variable replacement and content optimization
- **Image Optimization**: 20-50% size reduction without quality loss
- **Asset Optimization**: Efficient copying and processing

## 🔧 Configuration

### Build Configuration

Edit `build-optimized.js` to customize the build process:

```javascript
const config = {
  variables: {
    '{{SITE_NAME}}': 'Your Site Name',
    '{{CONTACT_PHONE}}': 'Your Phone'
  },
  imageOptimization: {
    enabled: true,
    quality: 85, // JPEG quality
    pngQuality: [0.65, 0.8], // PNG quality range
    formats: ['jpg', 'jpeg', 'png', 'gif', 'svg']
  }
};
```

### GitHub Actions

The workflow (`.github/workflows/build.yml`) handles:

- Automatic builds on push/PR
- Text processing and variable replacement
- Image optimization with multiple formats
- Minification of all assets
- Deployment to GitHub Pages
- Build artifact uploads

## 🎨 Customization

### Adding New Variables

1. Add variables to the configuration in `build-optimized.js`
2. Use the variables in your HTML, CSS, or JS files
3. The build process will automatically replace them

### Adding New Files

1. Add your file to the appropriate directory
2. Update the build configuration in `build-optimized.js`
3. Update the GitHub Action if needed

### Image Optimization Settings

You can customize image optimization in `build-optimized.js`:

```javascript
imageOptimization: {
  enabled: true,
  quality: 85, // JPEG quality (0-100)
  pngQuality: [0.65, 0.8], // PNG quality range
  formats: ['jpg', 'jpeg', 'png', 'gif', 'svg'],
  maxWidth: 1920,
  maxHeight: 1080
}
```

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with `npm run build`
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 📞 Support

For questions or support, contact:
- Email: sol.espuma@gmail.com
- WhatsApp: (16) 98809-9057

---

Built with ❤️ for Sol e Espuma Saboaria 