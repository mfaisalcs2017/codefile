import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { pusherServer } from '@/lib/pusher'

// Get a snippet by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const snippet = await prisma.snippet.findUnique({
      where: { id },
    })

    if (!snippet) {
      return NextResponse.json(
        { error: 'Snippet not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(snippet)
  } catch (error) {
    console.error('Error fetching snippet:', error)
    return NextResponse.json(
      { error: 'Failed to fetch snippet' },
      { status: 500 }
    )
  }
}

// Update a snippet
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { code, language, protected: isProtected } = body

    // Check if snippet exists and is not protected
    const existingSnippet = await prisma.snippet.findUnique({
      where: { id },
    })

    if (!existingSnippet) {
      return NextResponse.json(
        { error: 'Snippet not found' },
        { status: 404 }
      )
    }

    if (existingSnippet.protected && code !== undefined) {
      return NextResponse.json(
        { error: 'This snippet is protected and cannot be modified' },
        { status: 403 }
      )
    }

    const snippet = await prisma.snippet.update({
      where: { id },
      data: {
        ...(code !== undefined && { code }),
        ...(language !== undefined && { language }),
        ...(isProtected !== undefined && { protected: isProtected }),
      },
    })

    // Trigger Pusher event for real-time updates (only if PUSHER is configured)
    if (process.env.PUSHER_APP_ID) {
      try {
        await pusherServer.trigger(`snippet-${id}`, 'code-update', {
          code: snippet.code,
          language: snippet.language,
        })
      } catch (pusherError) {
        console.log('Pusher not configured, skipping real-time update')
      }
    }

    return NextResponse.json(snippet)
  } catch (error) {
    console.error('Error updating snippet:', error)
    return NextResponse.json(
      { error: 'Failed to update snippet' },
      { status: 500 }
    )
  }
}

// Delete a snippet
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.snippet.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting snippet:', error)
    return NextResponse.json(
      { error: 'Failed to delete snippet' },
      { status: 500 }
    )
  }
}
