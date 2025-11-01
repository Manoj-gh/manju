import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const distDir = path.join(projectRoot, 'dist');
const publicDir = path.join(projectRoot, 'public');
const buildDir = path.join(projectRoot, 'build');

console.log('📦 Organizing React build for deployment...');

// Copy React dist to build directory
if (fs.existsSync(distDir)) {
  // Clean build directory
  if (fs.existsSync(buildDir)) {
    fs.rmSync(buildDir, { recursive: true });
  }
  fs.mkdirSync(buildDir, { recursive: true });
  
  // Copy dist contents to build
  fs.cpSync(distDir, buildDir, { recursive: true });
  
  // Copy assets from public to build
  const publicAssetsDir = path.join(publicDir, 'assets');
  const buildAssetsDir = path.join(buildDir, 'assets');
  
  if (fs.existsSync(publicAssetsDir)) {
    if (!fs.existsSync(buildAssetsDir)) {
      fs.mkdirSync(buildAssetsDir, { recursive: true });
    }
    
    // Copy CSS, images, and other assets
    const files = fs.readdirSync(publicAssetsDir);
    files.forEach(file => {
      if (file.endsWith('.css') || file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.svg')) {
        fs.copyFileSync(
          path.join(publicAssetsDir, file),
          path.join(buildAssetsDir, file)
        );
      }
    });
  }
  
  // 5. Create SPA routing files for static hosting
  const htaccessContent = `RewriteEngine On

# Handle Angular and React Router
RewriteBase /

# Handle client-side routing
RewriteRule ^index\\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Set cache headers to prevent HTML caching
<FilesMatch "\\.html$">
    Header set Cache-Control "no-cache, no-store, must-revalidate"
    Header set Pragma "no-cache"
    Header set Expires "0"
</FilesMatch>

# Cache static assets for 1 year
<FilesMatch "\\.(css|js|png|jpg|jpeg|gif|ico|svg)$">
    Header set Cache-Control "public, max-age=31536000"
</FilesMatch>`;

  const notFoundContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Redirecting...</title>
    <script>
        // Redirect to the main app and let React Router handle routing
        var segmentCount = 0;
        var l = window.location;
        l.replace(
            l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
            l.pathname.split('/').slice(0, 1 + segmentCount).join('/') + 
            '/#' + l.pathname.slice(1) + (l.search || '')
        );
    </script>
</head>
<body>
    <p>Redirecting to React app...</p>
</body>
</html>`;

  fs.writeFileSync(path.join(buildDir, '.htaccess'), htaccessContent);
  fs.writeFileSync(path.join(buildDir, '404.html'), notFoundContent);

  // 6. Add cache-busting meta tags to index.html
  const indexPath = path.join(buildDir, 'index.html');
  let indexContent = fs.readFileSync(indexPath, 'utf-8');
  
  if (!indexContent.includes('Cache-Control')) {
    indexContent = indexContent.replace(
      '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
      `<meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />`
    );
    fs.writeFileSync(indexPath, indexContent);
  }

  console.log('✅ React build organized for Contentstack Launch!');
  console.log('🚀 Build directory ready with React SPA + assets + routing');
} else {
  console.error('❌ React dist directory not found. Run npm run react:build first.');
}
