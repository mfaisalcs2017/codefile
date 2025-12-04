# Quick Start Guide

Get your CodeFile app running in 5 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Environment Variables

The `.env` file is already created. For local development, it uses SQLite (no setup needed).

For real-time collaboration, sign up for a free Pusher account:

1. Go to [pusher.com](https://pusher.com) and create a free account
2. Create a new app
3. Copy your credentials from the "App Keys" tab
4. Update `.env` with your Pusher credentials:

```env
NEXT_PUBLIC_PUSHER_APP_KEY="your_key_here"
PUSHER_APP_ID="your_app_id_here"
PUSHER_APP_SECRET="your_secret_here"
NEXT_PUBLIC_PUSHER_CLUSTER="mt1"
```

**Note**: The app will work without Pusher, but real-time collaboration will be disabled.

## Step 3: Initialize Database

```bash
npx prisma generate
npx prisma migrate dev
```

## Step 4: Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

## Step 5: Test It Out

1. Click "New Code Snippet" on the home page
2. Start coding in the editor
3. Change the language from the dropdown
4. Copy the URL and open it in another browser tab
5. Test the real-time collaboration (if Pusher is configured)
6. Try the protected mode toggle

## Next Steps

- Read [DEPLOYMENT.md](DEPLOYMENT.md) to deploy to Vercel
- Customize the styling in [app/globals.css](app/globals.css)
- Add more features from the roadmap in [README.md](README.md)

## Troubleshooting

**Database issues?**
```bash
rm -rf prisma/dev.db prisma/migrations
npx prisma migrate dev --name init
```

**Build errors?**
```bash
rm -rf .next node_modules
npm install
npm run dev
```

**Port already in use?**
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9
npm run dev
```

## Project Structure

```
codefile/
├── app/                        # Next.js app directory
│   ├── api/snippets/          # API routes
│   ├── editor/[id]/           # Editor page
│   ├── page.tsx               # Home page
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Global styles
├── components/                 # React components
│   └── CodeEditor.tsx         # Monaco editor
├── lib/                       # Utilities
│   ├── prisma.ts              # Database client
│   └── pusher.ts              # Real-time client
├── prisma/                    # Database
│   └── schema.prisma          # Database schema
└── public/                    # Static files
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

That's it! You're ready to code! 🚀
