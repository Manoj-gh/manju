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
  
  // 5. Create SPA routing files for static hosting (Contentstack Launch)
  const redirectsContent = `/*    /index.html   200`;

  fs.writeFileSync(path.join(buildDir, '_redirects'), redirectsContent);
  
  // Copy index.html as 404.html for fallback routing
  const indexContent = fs.readFileSync(path.join(buildDir, 'index.html'), 'utf-8');
  fs.writeFileSync(path.join(buildDir, '404.html'), indexContent);

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
