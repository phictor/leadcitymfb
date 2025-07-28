# Lead City MFB Website - Deployment Guide

## Render.com Deployment Instructions

### Prerequisites
1. GitHub repository with the latest code
2. Render.com account
3. PostgreSQL database (can be created on Render)

### Step 1: Database Setup
1. In Render Dashboard, create a new PostgreSQL database:
   - Name: `leadcity-mfb-db`
   - Database Name: `leadcity_mfb`
   - User: `leadcity_user`
   - Plan: Free
   - Region: Ohio (recommended)

2. Note down the database connection string (Internal Database URL)

### Step 2: Web Service Setup
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure the service:

**Basic Settings:**
- Name: `leadcity-mfb-website`
- Runtime: Node
- Region: Ohio
- Branch: main
- Build Command: `npm ci && npm run build`
- Start Command: `npm start`

**Environment Variables:**
- `NODE_ENV`: `production`
- `PORT`: `10000` (Render default)
- `DATABASE_URL`: Select your PostgreSQL database from the dropdown

**Advanced Settings:**
- Health Check Path: `/`
- Auto-Deploy: Yes

### Step 3: Database Migration
After the first deployment, run the database migration:
1. Go to your web service dashboard
2. Open the Shell tab
3. Run: `npm run db:push`

### Alternative: Manual render.yaml Deployment

If you have a `render.yaml` file in your repository, Render will automatically use it:

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

databases:
  - name: leadcity-mfb-db
    databaseName: leadcity_mfb
    user: leadcity_user
    plan: free
    region: ohio
```

### Troubleshooting Common Issues

**Error: "not found: server"**
- Solution: Ensure your GitHub repository is correctly connected
- Check that the `render.yaml` file is in the root directory
- Verify the service name matches exactly

**Build Failures:**
- Ensure `package.json` has correct build scripts
- Check that all dependencies are listed in `dependencies`, not `devDependencies`
- Verify Node.js version compatibility

**Database Connection Issues:**
- Ensure `DATABASE_URL` environment variable is set
- Check that the database is in the same region as your web service
- Verify database credentials are correct

**Static Files Not Served:**
- Ensure the build command creates `dist/public` directory
- Check that `npm run build` completes successfully
- Verify static file paths in the application

### Post-Deployment Steps

1. **Verify Homepage**: Check that the main website loads correctly
2. **Test Forms**: Verify contact forms and applications work
3. **Admin Panel**: Test admin login at `/admin`
   - Username: `ctiardemmanuel`
   - Password: `DrEmmanuelcomputer`
4. **Database**: Confirm all data is populated correctly
5. **Security**: Verify source protection is active (no dev tools access)

### Performance Optimization

For production optimization:
- Enable gzip compression (handled by Render)
- Configure CDN for static assets (Render handles this)
- Set appropriate cache headers
- Monitor performance metrics in Render dashboard

### Custom Domain Setup

To use a custom domain:
1. Go to your web service settings
2. Add custom domain under "Custom Domains"
3. Configure DNS records as instructed by Render
4. SSL certificates are automatically provisioned

### Environment Variables Reference

Required environment variables:
- `NODE_ENV`: Set to `production`
- `DATABASE_URL`: PostgreSQL connection string
- `PORT`: Set to `10000` (Render default)

Optional environment variables:
- `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`: Auto-populated from `DATABASE_URL`

### Support

If you encounter issues:
1. Check Render build logs for specific error messages
2. Verify all files are committed to your repository
3. Ensure database migrations have been run
4. Contact Render support for platform-specific issues