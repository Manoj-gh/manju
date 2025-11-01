import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

// Read environment variables
const API_HOST = process.env.CONTENTSTACK_API_HOST || 'api.contentstack.io';
const CDN = process.env.CONTENTSTACK_CDN || 'cdn.contentstack.com/v3';
const API_KEY = process.env.CONTENTSTACK_API_KEY || 'blt979982b3ad227a1d';
const DELIVERY_TOKEN = process.env.CONTENTSTACK_DELIVERY_TOKEN || 'cs4a3fe30dbd2e57d4efb25c6a';
const ENVIRONMENT = process.env.CONTENTSTACK_ENVIRONMENT || 'development';
const LOCALE = process.env.CONTENTSTACK_LOCALE || 'en-us';

console.log('🔧 Injecting Contentstack environment variables...');
console.log(`   API_HOST: ${API_HOST}`);
console.log(`   CDN: ${CDN}`);
console.log(`   API_KEY: ${API_KEY.substring(0, 8)}...`);
console.log(`   ENVIRONMENT: ${ENVIRONMENT}`);

// Read the contentstack-sync.js template
const syncFilePath = path.join(projectRoot, 'public/assets/contentstack-sync.js');
let syncContent = fs.readFileSync(syncFilePath, 'utf-8');

// Replace the environment variable getters with actual values  
syncContent = syncContent.replace(
  /const API_HOST = [^;]+;/,
  `const API_HOST = 'https://cdn.contentstack.com/v3';`
);

syncContent = syncContent.replace(
  /const API_KEY = getEnvVar\('CONTENTSTACK_API_KEY'[^;]+;/,
  `const API_KEY = '${API_KEY}';`
);

syncContent = syncContent.replace(
  /const DELIVERY_TOKEN = getEnvVar\('CONTENTSTACK_DELIVERY_TOKEN'[^;]+;/,
  `const DELIVERY_TOKEN = '${DELIVERY_TOKEN}';`
);

syncContent = syncContent.replace(
  /const ENVIRONMENT = getEnvVar\('CONTENTSTACK_ENVIRONMENT'[^;]+;/,
  `const ENVIRONMENT = '${ENVIRONMENT}';`
);

syncContent = syncContent.replace(
  /const LOCALE = getEnvVar\('CONTENTSTACK_LOCALE'[^;]+;/,
  `const LOCALE = '${LOCALE}';`
);

// Remove the getEnvVar function since we don't need it anymore
syncContent = syncContent.replace(
  /\/\/ Get environment variables[\s\S]*?};/,
  '// Environment variables injected at build time'
);

// Write the updated file
fs.writeFileSync(syncFilePath, syncContent, 'utf-8');

console.log('✅ Environment variables successfully injected into contentstack-sync.js!');
console.log('🚀 Your site is ready for Contentstack Launch!');
