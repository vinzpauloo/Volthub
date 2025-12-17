# Netlify Environment Variables Setup

Since `.env` files are now in `.gitignore`, you need to set environment variables directly in Netlify's dashboard for your deployed site.

## Required Environment Variables

Based on your codebase, you need to set these variables in Netlify:

### Supabase Variables (Required)

1. **`NEXT_PUBLIC_SUPABASE_URL`**
   - Your Supabase project URL
   - Example: `https://xxxxxxxxxxxxx.supabase.co`
   - Get from: Supabase Dashboard → Settings → API → Project URL

2. **`NEXT_PUBLIC_SUPABASE_ANON_KEY`**
   - Your Supabase anon/public key
   - Example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - Get from: Supabase Dashboard → Settings → API → anon public key

3. **`SUPABASE_SERVICE_ROLE_KEY`** (Recommended)
   - Your Supabase service role key (for server-side operations)
   - ⚠️ **Keep this secret!** Never expose in client-side code
   - Get from: Supabase Dashboard → Settings → API → service_role key

### SMTP/Email Variables (Required for Contact Form)

4. **`SMTP_HOST`**
   - Your SMTP server hostname
   - Example: `smtp.gmail.com`

5. **`SMTP_PORT`**
   - Your SMTP server port
   - Example: `587`

6. **`SMTP_USER`**
   - Your SMTP username/email
   - Example: `your-email@gmail.com`

7. **`SMTP_PASS`**
   - Your SMTP password or app password
   - For Gmail: Use an App Password (not your regular password)

8. **`SMTP_FROM`** (Optional)
   - Email address to send from
   - Defaults to `SMTP_USER` if not set
   - Example: `your-email@gmail.com`

## How to Add Environment Variables in Netlify

### Step 1: Go to Your Site Settings

1. Log in to [Netlify Dashboard](https://app.netlify.com)
2. Select your site
3. Go to **Site configuration** → **Environment variables**

### Step 2: Add Each Variable

1. Click **"Add a variable"** or **"Add variable"**
2. Enter the **Variable name** (e.g., `NEXT_PUBLIC_SUPABASE_URL`)
3. Enter the **Variable value** (your actual value)
4. Click **"Save"**
5. Repeat for all variables listed above

### Step 3: Redeploy Your Site

After adding all variables:

1. Go to **Deploys** tab
2. Click **"Trigger deploy"** → **"Deploy site"**
   - Or push a new commit to trigger a new deploy

## Important Notes

### Variable Naming

- Variables starting with `NEXT_PUBLIC_` are exposed to the browser
- Variables without `NEXT_PUBLIC_` are server-side only (more secure)
- `SUPABASE_SERVICE_ROLE_KEY` should **NOT** have `NEXT_PUBLIC_` prefix

### Security Best Practices

1. ✅ **Never commit** `.env` files to Git (already done)
2. ✅ **Use Netlify's environment variables** for production
3. ✅ **Keep `SUPABASE_SERVICE_ROLE_KEY` secret** (server-side only)
4. ✅ **Rotate keys** if they were ever exposed in Git history

### Testing Your Setup

After deploying, check:

1. **Products page loads** - Tests Supabase connection
2. **Product detail pages work** - Tests database queries
3. **Contact form submits** - Tests SMTP and database save

### Troubleshooting

**Site not connecting to Supabase?**
- Check `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- Verify values are correct (no extra spaces)
- Check Netlify build logs for errors

**Contact form not working?**
- Check all SMTP variables are set
- Verify SMTP credentials are correct
- Check Netlify function logs for errors

**Build failing?**
- Check all required variables are set
- Verify variable names match exactly (case-sensitive)
- Check Netlify build logs for specific errors

## Quick Reference

Copy this list to check off as you add variables:

- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `SMTP_HOST`
- [ ] `SMTP_PORT`
- [ ] `SMTP_USER`
- [ ] `SMTP_PASS`
- [ ] `SMTP_FROM` (optional)

## Alternative: Using Netlify CLI

You can also set variables via CLI:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Set variables
netlify env:set NEXT_PUBLIC_SUPABASE_URL "your-url"
netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "your-key"
# ... etc
```

---

**Need help?** Check Netlify's docs: https://docs.netlify.com/environment-variables/overview/

