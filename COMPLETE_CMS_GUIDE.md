# Complete Sanity CMS Setup Guide for Lead City MFB

## 🚀 **What You Can Manage with Your CMS**

Your Sanity CMS now controls ALL content on your Lead City MFB website:

### 📰 **News & Articles**
- Create, edit, and publish news articles
- Upload images for each article
- Set featured articles
- Organize by categories (Technology, Education, Business, Security)

### 🏦 **Banking Products**
- Manage all your banking products (Savings, Current, Fixed Deposit, Loans)
- Edit product descriptions, features, and requirements
- Set interest rates and minimum amounts
- Upload product icons/images

### 🏢 **Branch Information**
- Add/edit branch locations and details
- Manage working hours and contact information
- List services available at each branch
- Set GPS coordinates for maps

### 📋 **Company Information**
- Edit About Us content
- Update mission, vision, and values
- Manage hero section content
- Control "Why Choose Us" sections

### ❓ **FAQ Management**
- Add frequently asked questions
- Organize FAQs by category
- Control which FAQs are displayed

## 🎯 **Step-by-Step Setup (10 minutes)**

### Step 1: Create Sanity Account
1. Go to [sanity.io](https://sanity.io)
2. Click "Get started for free"
3. Sign up with your email or Google account
4. Verify your email address

### Step 2: Create Your Project
1. Click "Create new project"
2. Choose "Blank project" template
3. Name it "Lead City MFB Content"
4. Select your preferred region (closest to Nigeria)
5. Copy your **Project ID** (you'll need this!)

### Step 3: Add Project ID to Your Website
1. In your Replit project, create a new secret:
   - Name: `VITE_SANITY_PROJECT_ID`
   - Value: Your actual project ID from step 2

2. Add another secret:
   - Name: `VITE_SANITY_DATASET` 
   - Value: `production`

### Step 4: Open Sanity Studio
Run this command in your terminal:
```bash
npx sanity dev
```

This opens your content management dashboard at `http://localhost:3333`

### Step 5: Start Managing Content!
You'll see these sections in your CMS:
- **News Articles** - Manage your blog posts
- **Banking Products** - Edit product information
- **Branches** - Update branch details
- **Company Information** - Edit About Us and other company content
- **FAQ** - Manage frequently asked questions

## 📝 **How to Use Each Section**

### Creating a News Article
1. Click "News Article" → "Create"
2. Fill in:
   - **Title**: Article headline
   - **Summary**: Brief description (200 chars max)
   - **Content**: Full article text
   - **Category**: Choose from Technology, Education, Business, Security
   - **Author**: Your name or team name
   - **Publish Date**: When to publish
   - **Read Time**: e.g., "3 min read"
   - **Featured**: Check if this should be the main featured article
   - **Image**: Upload article image
3. Click "Publish"

### Adding a Banking Product
1. Click "Banking Product" → "Create"
2. Fill in:
   - **Product Name**: e.g., "Premium Savings Account"
   - **Short Description**: Brief overview
   - **Full Description**: Detailed information
   - **Category**: Savings, Current, Fixed Deposit, etc.
   - **Key Features**: List main benefits
   - **Requirements**: What customers need
   - **Interest Rate**: e.g., "2.5% per annum"
   - **Minimum Amount**: e.g., "₦1,000"
   - **Icon**: Upload product icon
3. Click "Publish"

### Managing Branch Information
1. Click "Branch" → "Create"
2. Fill in:
   - **Branch Name**: e.g., "Lead City University Branch"
   - **Full Address**: Complete address
   - **City & State**: Location details
   - **Phone & Email**: Contact information
   - **Working Hours**: Operating schedule
   - **Available Services**: List what's available
   - **GPS Coordinates**: For map integration
   - **Head Office**: Check if this is main office
3. Click "Publish"

### Updating Company Information
1. Click "Company Information" → "Create"
2. Choose the section you want to edit:
   - About Us - Main content
   - Mission statement
   - Vision statement
   - Values
   - Home page hero section
   - Why Choose Us content
3. Write your content
4. Upload relevant images
5. Click "Publish"

### Adding FAQ Items
1. Click "FAQ" → "Create"
2. Fill in:
   - **Question**: Customer question
   - **Answer**: Your response
   - **Category**: General, Account Opening, Loans, etc.
   - **Display Order**: Where it appears in the list
3. Click "Publish"

## ⚡ **Important Tips**

### Content Updates
- Changes appear on your website **immediately** after publishing
- You can save drafts and publish later
- Use the preview feature to see how content looks

### Images
- Upload high-quality images (JPG, PNG)
- Sanity automatically optimizes images for web
- Use the hotspot feature to focus on important parts

### SEO Optimization
- Write descriptive titles and summaries
- Use relevant keywords naturally
- Keep content fresh and updated

### Managing Users
- Free plan includes 3 users
- Invite team members from Settings → Members
- Set different permission levels

## 🛠 **Advanced Features**

### Content Scheduling
- Set future publish dates for news articles
- Schedule product launches
- Plan content in advance

### Content Versions
- Sanity keeps history of all changes
- Restore previous versions if needed
- Compare different versions

### API Access
- Your website automatically gets updates
- No need to rebuild or redeploy
- Real-time content synchronization

## 🔧 **Commands You Need to Know**

```bash
# Start your website
npm run dev

# Open Sanity Studio (content management)
npx sanity dev

# Create Sanity account and project
npx sanity init

# Deploy your Sanity Studio online
npx sanity deploy
```

## 📊 **Free Tier Limits**

Sanity's free plan includes:
- ✅ 3 users
- ✅ 10GB bandwidth/month
- ✅ 500K API requests/month
- ✅ Unlimited content entries
- ✅ Image transformations
- ✅ Global CDN

## 🎯 **Next Steps**

1. **Set up your Sanity account** (Steps 1-3 above)
2. **Open Sanity Studio** with `npx sanity dev`
3. **Start with News Articles** - Add your first blog post
4. **Update Company Information** - Edit About Us content
5. **Add Banking Products** - Showcase your services
6. **Manage FAQs** - Help your customers

## 💡 **Why This Setup is Perfect**

- **Professional**: Industry-standard CMS used by major companies
- **User-Friendly**: Easy interface for non-technical team members
- **Real-Time**: Changes appear instantly on your website
- **Scalable**: Grows with your business
- **Secure**: Enterprise-level security and backups
- **Cost-Effective**: Free tier covers most small business needs

Your Lead City MFB website now has a complete content management system that puts you in full control of your digital presence!