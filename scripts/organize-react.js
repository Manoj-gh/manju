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
  
  console.log('✅ React build organized for Contentstack Launch!');
  console.log('🚀 Build directory ready with React SPA + assets');
} else {
  console.error('❌ React dist directory not found. Run npm run react:build first.');
}
