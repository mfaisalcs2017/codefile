'use client'

import { useEffect, useState, use } from 'react'
import CodeEditor from '@/components/CodeEditor'
import { getPusherClient } from '@/lib/pusher'
import Link from 'next/link'

interface Snippet {
  id: string
  code: string
  language: string
  protected: boolean
  createdAt: string
  updatedAt: string
}

export default function EditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [snippet, setSnippet] = useState<Snippet | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [activeUsers, setActiveUsers] = useState(1)

  useEffect(() => {
    fetchSnippet()
    setupRealtimeUpdates()
  }, [id])

  const fetchSnippet = async () => {
    try {
      const response = await fetch(`/api/snippets/${id}`)
      if (!response.ok) {
        throw new Error('Snippet not found')
      }
      const data = await response.json()
      setSnippet(data)
      setLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load snippet')
      setLoading(false)
    }
  }

  const setupRealtimeUpdates = () => {
    // Only set up Pusher if credentials are available
    if (!process.env.NEXT_PUBLIC_PUSHER_APP_KEY) {
      console.log('Pusher not configured, real-time updates disabled')
      return
    }

    try {
      const pusher = getPusherClient()
      const channel = pusher.subscribe(`snippet-${id}`)

      channel.bind('code-update', (data: { code: string; language: string }) => {
        setSnippet((prev) => (prev ? { ...prev, ...data } : null))
      })

      // Simulate active users (in production, you'd track this properly)
      setActiveUsers(Math.floor(Math.random() * 3) + 1)

      return () => {
        channel.unbind_all()
        channel.unsubscribe()
      }
    } catch (err) {
      console.log('Could not connect to Pusher:', err)
    }
  }

  const handleCodeChange = async (code: string) => {
    if (!snippet || snippet.protected) return

    setIsSaving(true)
    try {
      await fetch(`/api/snippets/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
    } catch (err) {
      console.error('Failed to save code:', err)
    } finally {
      setIsSaving(false)
    }
  }

  const handleLanguageChange = async (language: string) => {
    if (!snippet || snippet.protected) return

    try {
      await fetch(`/api/snippets/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language }),
      })
      setSnippet((prev) => (prev ? { ...prev, language } : null))
    } catch (err) {
      console.error('Failed to update language:', err)
    }
  }

  const copyToClipboard = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  }

  const toggleProtection = async () => {
    if (!snippet) return

    try {
      const response = await fetch(`/api/snippets/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ protected: !snippet.protected }),
      })
      const data = await response.json()
      setSnippet(data)
    } catch (err) {
      console.error('Failed to toggle protection:', err)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (error || !snippet) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
        <div className="text-white text-xl mb-4">
          {error || 'Snippet not found'}
        </div>
        <Link
          href="/"
          className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          Go Home
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white hover:text-primary-500 transition-colors">
            CodeFile
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-400">
              {activeUsers} {activeUsers === 1 ? 'user' : 'users'} active
            </div>
            {isSaving && (
              <div className="text-sm text-gray-400">Saving...</div>
            )}
            <button
              onClick={toggleProtection}
              className={`px-4 py-2 rounded-lg transition-colors ${
                snippet.protected
                  ? 'bg-yellow-600 hover:bg-yellow-700'
                  : 'bg-gray-700 hover:bg-gray-600'
              } text-white`}
            >
              {snippet.protected ? '🔒 Protected' : '🔓 Unprotected'}
            </button>
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              {copySuccess ? '✓ Copied!' : '📋 Share'}
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-hidden">
        <CodeEditor
          snippetId={id}
          initialCode={snippet.code}
          initialLanguage={snippet.language}
          isProtected={snippet.protected}
          onCodeChange={handleCodeChange}
          onLanguageChange={handleLanguageChange}
        />
      </main>
    </div>
  )
}
