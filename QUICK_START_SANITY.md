# 🚀 Quick Start: Set Up Your Sanity CMS (5 Minutes)

## ✅ **Your CMS is Ready - Just Follow These Steps!**

I've set up a complete Content Management System for your Lead City MFB website. You can now manage:

- **News & Blog Articles**
- **Banking Products** 
- **Branch Information**
- **Company Information** (About Us, Mission, Vision)
- **FAQ Items**

## **Step 1: Create Your Sanity Account (2 minutes)**

The terminal is asking you to log in. Choose one of these options:

### Option A: Use Google Account (Easiest)
1. In the terminal, select `Google` and press Enter
2. Your browser will open to sign in with Google
3. Sign in with your Google account
4. Authorize Sanity access

### Option B: Use GitHub Account
1. Select `GitHub` and press Enter
2. Sign in with your GitHub account
3. Authorize Sanity access

### Option C: Use Email/Password
1. Select `E-mail / password` and press Enter
2. Create a new account with your email
3. Follow the verification steps

## **Step 2: Create Your Project (1 minute)**

After logging in, the terminal will ask:

1. **Project name**: Type `Lead City MFB Content`
2. **Dataset**: Type `production` (or press Enter for default)
3. **Project template**: Select `Clean project with no predefined schemas`

**IMPORTANT**: Copy the Project ID that appears! You'll need it next.

## **Step 3: Add Project ID to Your Website (1 minute)**

1. In your Replit project, go to the **Secrets** tab (lock icon on left)
2. Click **+ New Secret**
3. Add these secrets:

```
Name: VITE_SANITY_PROJECT_ID
Value: [paste your project ID here]

Name: VITE_SANITY_DATASET  
Value: production
```

## **Step 4: Open Your CMS Dashboard (1 minute)**

In the terminal, run:
```bash
npx sanity dev
```

This opens your content management dashboard at `http://localhost:3333`

## **🎉 You're Done! Start Managing Content**

Your CMS dashboard will show these sections:

### 📰 **News Article** 
Create and manage blog posts with images

### 🏦 **Banking Product**
Add your banking services and products

### 🏢 **Branch** 
Manage branch locations and details

### 📋 **Company Information**
Edit About Us, Mission, Vision content

### ❓ **FAQ**
Add frequently asked questions

## **💡 Quick Tips**

- **Changes appear instantly** on your website after publishing
- **Upload images** directly in the CMS
- **Preview content** before publishing
- **Save drafts** and publish later
- **Invite team members** to help manage content

## **🔧 What Happens If You Don't Set Up Sanity?**

Your website works perfectly without Sanity setup! It uses fallback content, so your site is never broken. But setting up Sanity gives you full control over your content.

## **📞 Need Help?**

Your website is fully functional right now. Sanity setup is optional but recommended for easy content management.

**Ready to start?** Just follow Step 1 above and you'll have a professional CMS in minutes!