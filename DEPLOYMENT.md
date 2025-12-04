# Deployment Guide

This guide will help you deploy your CodeFile application to Vercel.

## Prerequisites

1. A [Vercel account](https://vercel.com) (free tier is sufficient)
2. A [Pusher account](https://pusher.com) (free tier is sufficient)
3. A PostgreSQL database (options below)

## Step 1: Set Up Pusher

1. Go to [pusher.com](https://pusher.com) and sign up/login
2. Click "Create app"
3. Enter app details:
   - Name: codefile-app (or your preferred name)
   - Cluster: Choose closest to your target users
   - Frontend: React
   - Backend: Node.js
4. Click "Create app"
5. Go to "App Keys" tab and save:
   - `app_id`
   - `key` (this will be `NEXT_PUBLIC_PUSHER_APP_KEY`)
   - `secret` (this will be `PUSHER_APP_SECRET`)
   - `cluster` (this will be `NEXT_PUBLIC_PUSHER_CLUSTER`)

## Step 2: Set Up Database

Choose one of these options:

### Option A: Vercel Postgres (Recommended)

1. Go to your Vercel dashboard
2. Navigate to Storage tab
3. Click "Create Database"
4. Select "Postgres"
5. Copy the connection string

### Option B: Supabase

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > Database
4. Copy the connection string under "Connection string"
5. Replace `[YOUR-PASSWORD]` with your database password

### Option C: Neon

1. Go to [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string

## Step 3: Prepare Your Code

1. Make sure your code is in a Git repository
2. Update `prisma/schema.prisma` to use PostgreSQL:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

3. Commit your changes:
```bash
git add .
git commit -m "Prepare for deployment"
git push
```

## Step 4: Deploy to Vercel

### Using Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com) and login
2. Click "Add New..." > "Project"
3. Import your Git repository
4. Configure your project:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: ./
   - Build Command: `npm run build`
   - Install Command: `npm install`

5. Add Environment Variables (click "Environment Variables"):

```env
DATABASE_URL=<your-postgresql-connection-string>
NEXT_PUBLIC_PUSHER_APP_KEY=<your-pusher-key>
PUSHER_APP_ID=<your-pusher-app-id>
PUSHER_APP_SECRET=<your-pusher-secret>
NEXT_PUBLIC_PUSHER_CLUSTER=<your-pusher-cluster>
NEXT_PUBLIC_APP_URL=<leave-empty-for-now>
```

6. Click "Deploy"

7. Once deployed, copy your deployment URL (e.g., `https://your-app.vercel.app`)

8. Go back to Settings > Environment Variables
9. Edit `NEXT_PUBLIC_APP_URL` and set it to your deployment URL
10. Redeploy the application

### Using Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts
5. Add environment variables when prompted, or add them in the Vercel dashboard later

## Step 5: Run Database Migrations

After deployment, you need to run database migrations:

### Option A: Using Vercel CLI

```bash
vercel env pull .env.production
DATABASE_URL="your-production-db-url" npx prisma migrate deploy
```

### Option B: Using Vercel Dashboard

1. Go to your project in Vercel dashboard
2. Navigate to Settings > Environment Variables
3. Make sure `DATABASE_URL` is set
4. Go to Deployments tab
5. Click on your latest deployment
6. Click "..." menu > "Redeploy"
7. Check "Use existing Build Cache" is OFF
8. Click "Redeploy"

The `postinstall` script in `package.json` will automatically run `prisma generate`.

To run migrations, you can use one of these methods:

1. **Add a migration script**: Add this to your `package.json`:
```json
{
  "scripts": {
    "vercel-build": "prisma migrate deploy && next build"
  }
}
```

2. **Or run manually** after first deployment:
```bash
DATABASE_URL="your-production-url" npx prisma migrate deploy
```

## Step 6: Test Your Deployment

1. Visit your Vercel URL
2. Click "New Code Snippet"
3. Test the editor
4. Copy the URL and open in another browser/tab
5. Verify real-time collaboration works
6. Test protected mode
7. Test language switching

## Troubleshooting

### Real-time collaboration not working

- Check that all Pusher environment variables are set correctly
- Verify your Pusher app is in the same cluster as configured
- Check browser console for errors

### Database connection errors

- Verify your `DATABASE_URL` is correct
- Make sure migrations have been run: `npx prisma migrate deploy`
- Check that your database is accessible from Vercel's region

### Build errors

- Make sure all dependencies are in `package.json`
- Check that TypeScript types are correct: `npm run build` locally first
- Review build logs in Vercel dashboard

### Environment variables not working

- Remember that `NEXT_PUBLIC_*` variables are embedded at build time
- After changing environment variables, redeploy the application
- Check that variable names are exact (case-sensitive)

## Post-Deployment

### Custom Domain (Optional)

1. Go to your project in Vercel
2. Navigate to Settings > Domains
3. Add your custom domain
4. Follow DNS configuration instructions
5. Update `NEXT_PUBLIC_APP_URL` environment variable
6. Redeploy

### Monitoring

- Check Vercel Analytics for usage statistics
- Monitor Pusher dashboard for real-time connections
- Review database usage in your database provider's dashboard

### Scaling

- Vercel automatically scales your application
- For database scaling, check your database provider's plans
- For Pusher scaling, upgrade to a paid plan if needed

## Costs

- **Vercel**: Free tier includes 100GB bandwidth and 100 build hours/month
- **Pusher**: Free tier includes 200k messages/day and 100 concurrent connections
- **Database**:
  - Vercel Postgres: Free tier includes 256MB storage
  - Supabase: Free tier includes 500MB storage
  - Neon: Free tier includes 512MB storage

## Support

If you encounter issues:

1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Review [Vercel documentation](https://vercel.com/docs)
3. Check [Pusher documentation](https://pusher.com/docs)
4. Open an issue in the GitHub repository

## Security Notes

- Never commit `.env` file to Git
- Use Vercel's environment variables for secrets
- Enable HTTPS (automatic with Vercel)
- Consider adding rate limiting for API routes
- Regularly update dependencies

## Maintenance

### Updating dependencies

```bash
npm update
npm audit fix
git commit -am "Update dependencies"
git push
```

Vercel will automatically redeploy.

### Backup database

Set up regular backups with your database provider:
- Vercel Postgres: Automatic backups included
- Supabase: Automatic daily backups
- Neon: Point-in-time restore available

---

Congratulations! Your CodeFile application should now be live and accessible to users worldwide! 🎉
