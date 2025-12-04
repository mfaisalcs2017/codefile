import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Create a new snippet
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { code = '', language = 'javascript', protected: isProtected = false } = body

    const snippet = await prisma.snippet.create({
      data: {
        code,
        language,
        protected: isProtected,
      },
    })

    return NextResponse.json(snippet, { status: 201 })
  } catch (error) {
    console.error('Error creating snippet:', error)
    return NextResponse.json(
      { error: 'Failed to create snippet' },
      { status: 500 }
    )
  }
}
