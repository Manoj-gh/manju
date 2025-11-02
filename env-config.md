# 🔧 Environment Variables Setup

## For Localhost Development:
Create a `.env` file in the project root:

```bash
# .env
CONTENTSTACK_API_KEY=blt979982b3ad227a1d
CONTENTSTACK_DELIVERY_TOKEN=cs4a3fe30dbd2e57d4efb25c6a
CONTENTSTACK_ENVIRONMENT=development
CONTENTSTACK_LOCALE=en-us
```

## For Contentstack Launch:
Set these environment variables in your Contentstack Launch dashboard:

### Environment Variables to Set:
- **CONTENTSTACK_API_KEY**: `blt979982b3ad227a1d`
- **CONTENTSTACK_DELIVERY_TOKEN**: `cs4a3fe30dbd2e57d4efb25c6a`
- **CONTENTSTACK_ENVIRONMENT**: `development` (or `production`)
- **CONTENTSTACK_LOCALE**: `en-us`

### How to Set in Contentstack Launch:
1. Go to your **Contentstack Launch** dashboard
2. Navigate to your site settings
3. Find **Environment Variables** section
4. Add each variable listed above
5. **Deploy** your site

## 🎯 Your Code Now Supports:
- ✅ **Localhost** with .env file
- ✅ **Contentstack Launch** with dashboard env vars
- ✅ **Fallback values** if env vars not set
- ✅ **Automatic detection** of environment

## 🚀 Updated Code Features:
The contentstack-sync.js now automatically:
- Checks `window.env` (Contentstack Launch)
- Checks `process.env` (Node.js)
- Falls back to hardcoded values if needed

Your Contentstack integration will work perfectly on Launch! 🌟
