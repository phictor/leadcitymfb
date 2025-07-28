# Quick Render Deployment Fix

## The Error You're Seeing
```
Deploy Error: not found: server: srv-d21lnsvgi27c73e353c0
```

This error means Render cannot find the web service configuration. Here's how to fix it:

## Solution 1: Use the Updated render.yaml

The updated `render.yaml` file in your repository has the correct configuration:

```yaml
services:
  - type: web
    name: leadcity-mfb-website
    runtime: node
    env: node
    region: ohio
    plan: free
    branch: main
    buildCommand: npm ci && npm run build
    startCommand: npm start
    healthCheckPath: /
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
```

## Solution 2: Manual Service Creation

If the YAML doesn't work, create the service manually:

1. **Delete the failed service** from your Render dashboard
2. **Create a new Web Service**:
   - Repository: Your GitHub repo
   - Name: `leadcity-mfb-website`
   - Runtime: `Node`
   - Build Command: `npm ci && npm run build`
   - Start Command: `npm start`
   - Environment Variables:
     - `NODE_ENV` = `production`
     - `PORT` = `10000`

3. **Add Database** (if needed):
   - Create PostgreSQL database
   - Add `DATABASE_URL` environment variable to your web service

## Solution 3: Check Repository Connection

Make sure:
- Your GitHub repository is properly connected
- The latest code is pushed to the main branch
- The `render.yaml` file is in the root directory
- You have necessary build files (`package.json`, etc.)

## Test Locally First

Before deploying, test the production build locally:

```bash
npm run build
npm start
```

Then visit `http://localhost:10000` to verify everything works.

## Next Steps After Deployment

1. Visit your deployed URL
2. Test the admin panel: `/admin`
3. Verify all forms work
4. Check that source protection is active
5. Run database migration if needed: `npm run db:push`

The website should now deploy successfully with all security features intact!