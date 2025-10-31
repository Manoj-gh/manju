# 🚀 Contentstack Optimized Website

A high-performance website with seamless Contentstack CMS integration, featuring zero content flashing and perfect image synchronization.

## ✨ Features

- **🎯 Zero Content Flash** - Smooth loading states and transitions
- **🖼️ Perfect Image Sync** - Real-time image loading from Contentstack  
- **🚀 Enhanced Cache-Busting** - No stale content or images
- **🔗 Clean URLs** - No .html extensions with proper redirects
- **⚡ Optimized Performance** - Fast loading across all pages
- **📱 Responsive Design** - Works perfectly on all devices

## 🛠️ Quick Start

### Local Development
```bash
git clone https://github.com/Manoj-gh/manju.git
cd manju
npm install
npm run dev
```

Visit: `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli  
netlify deploy --prod
```

### Heroku
```bash
git push heroku main
```

### Render
- Connect your GitHub repository
- Build command: `npm install`
- Start command: `npm start`

## 📁 Project Structure

```
├── public/           # Static HTML pages and assets
├── scripts/          # Contentstack import/export utilities  
├── cms/              # Content type definitions
├── server.js         # Express.js server
├── package.json      # Dependencies and scripts
└── README.md         # This file
```

## 🎨 Pages

- **Homepage** (`/`) - Dynamic hero, roles, and success stories
- **Platform** (`/platform`) - Feature sections with images
- **Company** (`/company`) - Team, offices, and company info  
- **Documentation** (`/docs`) - API references and guides
- **Blog** (`/blog`) - Articles with featured images
- **And 9 more optimized pages!**

## ⚙️ Configuration

### Contentstack Setup
Update credentials in `public/assets/contentstack-sync.js`:
```javascript
const API_KEY = 'your-api-key';
const DELIVERY_TOKEN = 'your-delivery-token';
const ENVIRONMENT = 'your-environment';
```

### Environment Variables
```bash
NODE_ENV=production
PORT=3000
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm start` - Start production server  
- `npm run build` - Build for production
- `npm run import:all` - Import content to Contentstack
- `npm run verify:delivery` - Test Contentstack API

## 📊 Performance

- **✅ 14/14 Pages Working** - All routes functional
- **✅ 12/12 Content Types** - Rich CMS integration  
- **✅ Zero Cache Issues** - Real-time updates
- **✅ Perfect Image Loading** - No placeholder flashing

## 🚀 Deployment-Ready

Includes configuration files for all major platforms:
- `vercel.json` - Vercel deployment
- `netlify.toml` - Netlify deployment  
- `Procfile` - Heroku deployment
- `render.yaml` - Render deployment

## 📝 License

MIT License - feel free to use this optimized setup for your projects!

---

**Built with ❤️ for seamless Contentstack integration**