'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()
  const [isCreating, setIsCreating] = useState(false)

  const createNewSnippet = async () => {
    setIsCreating(true)
    try {
      const response = await fetch('/api/snippets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: '// Start coding here...\n',
          language: 'javascript',
          protected: false,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create snippet')
      }

      const snippet = await response.json()
      router.push(`/editor/${snippet.id}`)
    } catch (error) {
      console.error('Error creating snippet:', error)
      alert('Failed to create snippet. Please try again.')
      setIsCreating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            CodeFile
          </h1>
          <p className="text-2xl text-gray-300 mb-4">
            Share collaborative code snippets online ⚡
          </p>
          <p className="text-lg text-gray-400 mb-12">
            Create, share and edit code in real-time with other developers
          </p>

          <button
            onClick={createNewSnippet}
            disabled={isCreating}
            className="px-8 py-4 bg-primary-500 text-white text-lg font-semibold rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            {isCreating ? 'Creating...' : '+ New Code Snippet'}
          </button>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2">Fast & Free</h3>
              <p className="text-gray-400">
                No account required. Start coding instantly and share with a simple link.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-2">Real-time Collaboration</h3>
              <p className="text-gray-400">
                See code changes instantly as others edit. Perfect for pair programming.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-semibold mb-2">120+ Languages</h3>
              <p className="text-gray-400">
                Syntax highlighting for all major programming languages.
              </p>
            </div>
          </div>

          <div className="mt-16 bg-gray-800 p-8 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-bold mb-6">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="flex items-start gap-3">
                <span className="text-green-500">✓</span>
                <span>Monaco Editor (same as VS Code)</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-500">✓</span>
                <span>Protected mode to prevent edits</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-500">✓</span>
                <span>Share with a simple URL</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-500">✓</span>
                <span>Light & dark themes</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-500">✓</span>
                <span>Real-time collaboration</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-500">✓</span>
                <span>No account required</span>
              </div>
            </div>
          </div>

          <div className="mt-12 text-gray-500">
            <p>Built for developers, by developers</p>
          </div>
        </div>
      </div>
    </div>
  )
}
