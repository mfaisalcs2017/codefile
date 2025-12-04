import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CodeFile - Collaborative Code Editor',
  description: 'Share collaborative code snippets online. Create, share and edit code in real-time.',
  keywords: ['code editor', 'collaborative', 'share code', 'pair programming', 'real-time'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
