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

    const body = await req.json();
    const { isPublic, slug } = body;

    let targetSlug = existing.slug;

    if (slug) {
      const sanitized = slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-');
      // Check collision
      const check = await prisma.resume.findUnique({
        where: { slug: sanitized },
      });
      if (check && check.id !== id) {
        return NextResponse.json(
          { error: 'This custom URL slug is already taken. Please choose another.' },
          { status: 409 }
        );
      }
      targetSlug = sanitized;
    } else if (isPublic && !targetSlug) {
      // Generate default slug from title + short random string
      const base = existing.title.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 20);
      const randomSuffix = Math.random().toString(36).substring(2, 7);
      targetSlug = `${base}-${randomSuffix}`;
    }

    const updated = await prisma.resume.update({
      where: { id },
      data: {
        isPublic: Boolean(isPublic),
        slug: targetSlug,
      },
    });

    return NextResponse.json({
      message: updated.isPublic ? 'Portfolio is now live and public!' : 'Portfolio is now private.',
      isPublic: updated.isPublic,
      slug: updated.slug,
      shareUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/p/${updated.slug}`,
    });
  } catch (error) {
    console.error('Share toggle error:', error);
    return NextResponse.json({ error: 'Failed to update portfolio settings' }, { status: 500 });
  }
}
