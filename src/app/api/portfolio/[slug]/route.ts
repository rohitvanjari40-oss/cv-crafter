import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    if (!slug) {
      return NextResponse.json({ error: 'Slug parameter is required' }, { status: 400 });
    }

    const resume = await prisma.resume.findUnique({
      where: { slug: slug.toLowerCase() },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!resume || !resume.isPublic) {
      return NextResponse.json(
        { error: 'Portfolio not found or has been set to private by the author.' },
        { status: 404 }
      );
    }

    let parsedData = {};
    try {
      parsedData = JSON.parse(resume.resumeData);
    } catch {
      parsedData = {};
    }

    return NextResponse.json({
      title: resume.title,
      templateId: resume.templateId,
      targetRole: resume.targetRole,
      authorName: resume.user.name,
      updatedAt: resume.updatedAt,
      resumeData: parsedData,
    });
  } catch (error) {
    console.error('Portfolio fetch error:', error);
    return NextResponse.json({ error: 'Failed to load public portfolio' }, { status: 500 });
  }
}
