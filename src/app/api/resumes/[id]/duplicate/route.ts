import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Please login.' }, { status: 401 });
    }

    const { id } = params;
    const existing = await prisma.resume.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    if (existing.userId !== session.id && session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Clone resume with (Copy) title and private by default
    const cloned = await prisma.resume.create({
      data: {
        userId: session.id,
        title: `${existing.title} (Copy)`,
        templateId: existing.templateId,
        isPublic: false,
        slug: null,
        targetRole: existing.targetRole,
        resumeData: existing.resumeData,
      },
    });

    return NextResponse.json({
      message: 'Resume duplicated successfully',
      resume: cloned,
    }, { status: 201 });
  } catch (error) {
    console.error('Duplicate error:', error);
    return NextResponse.json({ error: 'Failed to duplicate resume' }, { status: 500 });
  }
}
