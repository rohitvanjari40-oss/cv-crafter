import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';
import { defaultEmptyResume, sampleStudentResume } from '@/lib/sampleData';

export async function GET(req: NextRequest) {
  try {
    const session = getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Please login.' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || 'updated'; // 'updated', 'title', 'created'

    let orderBy: any = { updatedAt: 'desc' };
    if (sort === 'title') orderBy = { title: 'asc' };
    if (sort === 'created') orderBy = { createdAt: 'desc' };

    const where: any = {
      userId: session.id,
    };

    if (search.trim()) {
      where.title = {
        contains: search.trim(),
      };
    }

    const resumes = await prisma.resume.findMany({
      where,
      orderBy,
      select: {
        id: true,
        title: true,
        templateId: true,
        isPublic: true,
        slug: true,
        targetRole: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ resumes, count: resumes.length });
  } catch (error) {
    console.error('Error fetching resumes:', error);
    return NextResponse.json({ error: 'Failed to fetch resumes' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Please login.' }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const { title, templateId, useSample } = body;

    const initialData = useSample ? sampleStudentResume : defaultEmptyResume;
    if (useSample && session.name) {
      initialData.personal.fullName = session.name;
      initialData.personal.email = session.email;
    }

    const newResume = await prisma.resume.create({
      data: {
        userId: session.id,
        title: title?.trim() || 'My Professional Resume',
        templateId: templateId || 'modern',
        targetRole: 'Full-Stack Developer',
        resumeData: JSON.stringify(initialData),
      },
    });

    return NextResponse.json(
      {
        message: 'Resume created successfully',
        resume: {
          ...newResume,
          resumeData: initialData,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating resume:', error);
    return NextResponse.json({ error: 'Failed to create resume' }, { status: 500 });
  }
}
