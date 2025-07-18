# 🌿 Personal Website V2 - Nature-Inspired Design

A beautiful, responsive personal website with nature-inspired design, modern animations, and comprehensive features for showcasing your skills, projects, and personality.

## ✨ Features

### 🎨 Design & UI/UX
- **Nature-inspired Color Palette**: Emerald green, sage green, coral rose, and muted gold
- **Organic Animations**: Floating particles, gentle waves, and organic shapes
- **Responsive Design**: Perfect on desktop, tablet, and mobile devices
- **Modern Typography**: Playfair Display for headings, Inter for body text
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

### 🚀 Performance & Technology
- **Vanilla JavaScript**: No framework dependencies, lightweight and fast
- **CSS Grid & Flexbox**: Modern layout techniques
- **Intersection Observer**: Smooth scroll animations and lazy loading
- **Web Workers**: Heavy computations in background threads
- **Progressive Enhancement**: Works even with JavaScript disabled

### 📱 Interactive Features
- **Smooth Scrolling**: Buttery smooth navigation between sections
- **Skill Progress Bars**: Animated skill level indicators
- **Project Modals**: Detailed project information in beautiful overlays
- **Contact Form**: Functional contact form with validation
- **Copy to Clipboard**: Click contact methods to copy instantly

### 🛠️ Development Tools
- **Stagewise Toolbar**: Real-time UI editing and testing
- **Live Server**: Hot reload during development
- **ESLint & Prettier**: Code quality and formatting
- **Modular Architecture**: Separate components for easy maintenance

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/personal-website-v2.git
cd personal-website-v2
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Stagewise Toolbar
```bash
npm run setup-stagewise
```

### 4. Start Development Server
```bash
npm run dev
```

Your website will be available at `http://localhost:3000`

## 🎯 Stagewise Toolbar Integration

This website includes the **Stagewise Toolbar** for enhanced development experience:

### Auto-Setup (Recommended)
In Cursor IDE:
1. Press `Cmd + Shift + P` (Mac) or `Ctrl + Shift + P` (Windows)
2. Type `setupToolbar`
3. Execute the command

### Manual Setup
The toolbar is already integrated in the main JavaScript file. It will automatically initialize in development mode.

### Configuration
The toolbar configuration is in `package.json`:
```json
"stagewise": {
  "config": {
    "plugins": [],
    "theme": {
      "primaryColor": "#2e7d66",
      "secondaryColor": "#a3b18a",
      "accentColor": "#e76f51"
    },
    "toolbar": {
      "position": "bottom-right",
      "showOnlyInDev": true
    }
  }
}
```

## 📁 Project Structure

```
personalwebsite_v2/
├── index.html                 # Main HTML file
├── package.json              # Project configuration
├── README.md                 # This file
├── assets/
│   ├── css/
│   │   ├── main.css          # Main styles
│   │   ├── components.css    # Component-specific styles
│   │   └── animations.css    # Animation definitions
│   ├── js/
│   │   ├── main.js          # Main JavaScript
│   │   └── animations.js    # Animation controller
│   └── images/              # Static images
├── components/
│   ├── navbar.js            # Navigation component
│   ├── hero.js              # Hero section
│   ├── skills.js            # Skills section
│   ├── projects.js          # Projects section
│   └── contact.js           # Contact form
└── services/                # Service integrations
```

## 🎨 Color Palette

| Color | Hex Code | Usage |
|-------|----------|--------|
| **Emerald Green** | `#2e7d66` | Primary buttons, links, accents |
| **Sage Green** | `#a3b18a` | Secondary elements, borders |
| **Coral Rose** | `#e76f51` | Highlights, call-to-action |
| **Muted Gold** | `#c9b458` | Special accents, icons |
| **Mist White** | `#f5f7f4` | Background, cards |
| **Deep Forest** | `#1b2a27` | Dark mode, footer |

## 🔧 Customization

### Personal Information
Edit the following sections in `index.html`:
- Update `<title>` and meta tags
- Replace "Your Name" with your actual name
- Update contact information in the contact section
- Replace placeholder images with your photos

### Skills & Technologies
In the skills section, update:
- Programming languages and proficiency levels
- Human languages and levels
- Add or remove skills as needed

### Projects
Update the projects section with:
- Your actual project images
- Project descriptions
- Technology stacks
- Demo and source code links

### Blog Posts
Replace placeholder blog content with:
- Your actual blog posts
- Correct dates and categories
- Real blog post links

### Services
Customize the services section with:
- Your actual services
- Pricing information
- Service descriptions

## 🎭 Animations Guide

### Built-in Animation Classes
- `.animate-fadeInUp` - Fade in from bottom
- `.animate-slideInLeft` - Slide in from left
- `.animate-bounceIn` - Bounce entrance
- `.animate-scaleIn` - Scale entrance
- `.animate-float` - Floating animation
- `.animate-organicPulse` - Organic pulsing effect

### Adding Custom Animations
1. Define keyframes in `assets/css/animations.css`
2. Create animation classes
3. Apply via JavaScript or CSS

### Nature Effects
- **Floating Particles**: Automatic background particles
- **Organic Shapes**: Morphing background elements
- **Gentle Waves**: Subtle movement effects
- **Wind Sway**: Interactive hover effects

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile-First Approach
All styles are written mobile-first with progressive enhancement for larger screens.

## 🔒 Security Best Practices

### Form Security
- Client-side validation
- CSRF protection ready
- Input sanitization
- Rate limiting support

### Content Security
- No inline scripts
- Secure image sources
- HTTPS ready
- Safe external links

## 🚀 Performance Optimization

### Loading Performance
- Lazy loading for images
- Intersection Observer for animations
- Optimized CSS delivery
- Minimal JavaScript bundles

### Runtime Performance
- Hardware acceleration for animations
- Throttled scroll events
- Efficient event listeners
- Memory leak prevention

## 🧪 Testing

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Device Testing
- iPhone (iOS 14+)
- iPad (iOS 14+)
- Android devices (Android 10+)
- Desktop browsers

## 📦 Deployment

### GitHub Pages
1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Choose source branch (usually `main`)
4. Your site will be available at `https://yourusername.github.io/repository-name`

### Netlify
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `./`
4. Deploy automatically on push

### Vercel
1. Import your GitHub repository
2. Framework preset: Other
3. Build command: `npm run build`
4. Output directory: `./`

## 🛠️ Scripts

```bash
# Development
npm run dev          # Start development server with live reload
npm run serve        # Start static server

# Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier

# Stagewise
npm run setup-stagewise  # Install Stagewise toolbar
```

## 🐛 Troubleshooting

### Common Issues

**Animations not working:**
- Check browser compatibility
- Ensure JavaScript is enabled
- Verify CSS files are loading

**Stagewise toolbar not appearing:**
- Ensure you're in development mode
- Check browser console for errors
- Verify toolbar is properly installed

**Contact form not submitting:**
- Update form action URL
- Implement server-side handling
- Check validation rules

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

If you need help or have questions:
- Create an issue on GitHub
- Check the documentation
- Contact via email (update in contact section)

## 🙏 Acknowledgments

- **Design Inspiration**: Nature and organic forms
- **Stagewise Toolbar**: For enhanced development experience
- **Color Palette**: Inspired by forest and earth tones
- **Animations**: Smooth and organic motion principles

---

**Made with 🌱 and lots of ☕** 

**Follow best practices for security, accessibility, and performance.** 