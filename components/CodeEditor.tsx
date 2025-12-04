'use client'

import { Editor } from '@monaco-editor/react'
import { useState, useEffect } from 'react'

interface CodeEditorProps {
  snippetId: string
  initialCode?: string
  initialLanguage?: string
  isProtected?: boolean
  onCodeChange?: (code: string) => void
  onLanguageChange?: (language: string) => void
}

const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'cpp', label: 'C++' },
  { value: 'c', label: 'C' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'swift', label: 'Swift' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'json', label: 'JSON' },
  { value: 'xml', label: 'XML' },
  { value: 'yaml', label: 'YAML' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'sql', label: 'SQL' },
  { value: 'shell', label: 'Shell' },
]

export default function CodeEditor({
  snippetId,
  initialCode = '',
  initialLanguage = 'javascript',
  isProtected = false,
  onCodeChange,
  onLanguageChange,
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [language, setLanguage] = useState(initialLanguage)
  const [theme, setTheme] = useState<'vs-dark' | 'light'>('vs-dark')

  useEffect(() => {
    setCode(initialCode)
  }, [initialCode])

  useEffect(() => {
    setLanguage(initialLanguage)
  }, [initialLanguage])

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined && !isProtected) {
      setCode(value)
      onCodeChange?.(value)
    }
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value
    setLanguage(newLanguage)
    onLanguageChange?.(newLanguage)
  }

  const handleThemeToggle = () => {
    setTheme(theme === 'vs-dark' ? 'light' : 'vs-dark')
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-700">
        <div className="flex items-center gap-4">
          <select
            value={language}
            onChange={handleLanguageChange}
            className="px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            disabled={isProtected}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
          {isProtected && (
            <span className="px-3 py-1 bg-yellow-600 text-white text-sm rounded-full">
              Protected
            </span>
          )}
        </div>
        <button
          onClick={handleThemeToggle}
          className="px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors"
        >
          {theme === 'vs-dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
      <div className="flex-1">
        <Editor
          height="100%"
          language={language}
          value={code}
          theme={theme}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            rulers: [],
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            readOnly: isProtected,
          }}
        />
      </div>
    </div>
  )
}
