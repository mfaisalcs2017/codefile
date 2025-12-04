# CodeFile - Collaborative Code Editor

A collaborative code editor similar to codefile.io, built with Next.js 14, TypeScript, Monaco Editor, and real-time collaboration using Pusher.

## Features

- **Real-time Collaboration**: Multiple users can edit code simultaneously
- **120+ Languages**: Syntax highlighting for all major programming languages
- **Monaco Editor**: The same editor that powers VS Code
- **Protected Mode**: Lock snippets to prevent unauthorized edits
- **Dark/Light Themes**: Choose your preferred coding environment
- **No Account Required**: Start coding instantly
- **Share with URL**: Simple link sharing for collaboration
- **Auto-save**: Changes are automatically saved

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: SQLite (dev) / PostgreSQL (production)
- **ORM**: Prisma
- **Editor**: Monaco Editor
- **Real-time**: Pusher
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Pusher account (free tier available at https://pusher.com)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd codefile
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your Pusher credentials:
```env
DATABASE_URL="file:./dev.db"

NEXT_PUBLIC_PUSHER_APP_KEY="your_pusher_app_key"
PUSHER_APP_ID="your_pusher_app_id"
PUSHER_APP_SECRET="your_pusher_app_secret"
NEXT_PUBLIC_PUSHER_CLUSTER="your_pusher_cluster"

NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

4. Initialize the database:
```bash
npx prisma generate
npx prisma migrate dev
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

### Option 1: Deploy with Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts and add environment variables when asked.

### Option 2: Deploy via GitHub

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables in Vercel dashboard
6. Click "Deploy"

### Environment Variables for Production

In Vercel dashboard, add these environment variables:

```
DATABASE_URL=<your-postgres-connection-string>
NEXT_PUBLIC_PUSHER_APP_KEY=<your-pusher-key>
PUSHER_APP_ID=<your-pusher-app-id>
PUSHER_APP_SECRET=<your-pusher-secret>
NEXT_PUBLIC_PUSHER_CLUSTER=<your-pusher-cluster>
NEXT_PUBLIC_APP_URL=<your-vercel-url>
```

### Database Setup for Production

For production, use a PostgreSQL database:

1. Create a PostgreSQL database (recommended: Vercel Postgres, Supabase, or Neon)
2. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
3. Run migrations in production:
```bash
npx prisma migrate deploy
```

## Getting Pusher Credentials

1. Sign up at [pusher.com](https://pusher.com)
2. Create a new app
3. Go to "App Keys" tab
4. Copy your credentials:
   - app_id
   - key (NEXT_PUBLIC_PUSHER_APP_KEY)
   - secret
   - cluster

## Project Structure

```
codefile/
├── app/
│   ├── api/
│   │   └── snippets/          # API routes for CRUD operations
│   ├── editor/[id]/            # Editor page
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   └── globals.css             # Global styles
├── components/
│   └── CodeEditor.tsx          # Monaco editor component
├── lib/
│   ├── prisma.ts               # Prisma client
│   └── pusher.ts               # Pusher configuration
├── prisma/
│   └── schema.prisma           # Database schema
├── public/                      # Static files
└── package.json
```

## API Routes

- `POST /api/snippets` - Create a new snippet
- `GET /api/snippets/[id]` - Get snippet by ID
- `PATCH /api/snippets/[id]` - Update snippet
- `DELETE /api/snippets/[id]` - Delete snippet

## Features Roadmap

- [ ] User authentication (optional)
- [ ] Dashboard for managing snippets
- [ ] Snippet expiration dates
- [ ] Private snippets with passwords
- [ ] Code execution (sandbox)
- [ ] Video/audio chat integration
- [ ] Snippet templates
- [ ] Export to GitHub Gist

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

## Credits

Built with ❤️ using modern web technologies.
