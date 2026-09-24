import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';
import { resumeUpdateSchema } from '@/lib/validation';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Please login.' }, { status: 401 });
    }

    const { id } = params;
    const resume = await prisma.resume.findUnique({
      where: { id },
    });

    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    // Security: Only owner or admin can access
    if (resume.userId !== session.id && session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden. You do not have access to this resume.' }, { status: 403 });
    }

    let parsedData = {};
    try {
      parsedData = JSON.parse(resume.resumeData);
    } catch {
      parsedData = {};
    }

    return NextResponse.json({
      resume: {
        ...resume,
        resumeData: parsedData,
      },
    });
  } catch (error) {
    console.error('Error fetching resume:', error);
    return NextResponse.json({ error: 'Failed to fetch resume' }, { status: 500 });
  }
}

export async function PUT(
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
      return NextResponse.json({ error: 'Forbidden. You do not have permission to edit this resume.' }, { status: 403 });
    }

    const body = await req.json();
    const parseResult = resumeUpdateSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json({ error: parseResult.error.errors[0].message }, { status: 400 });
    }

    const { title, templateId, isPublic, slug, targetRole, resumeData } = parseResult.data;

    // Check slug uniqueness if changed
    if (slug && slug !== existing.slug) {
      const duplicateSlug = await prisma.resume.findUnique({
        where: { slug },
      });
      if (duplicateSlug && duplicateSlug.id !== id) {
        return NextResponse.json(
          { error: 'This portfolio URL slug is already taken. Please choose another one.' },
          { status: 409 }
        );
      }
    }

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (templateId !== undefined) updateData.templateId = templateId;
    if (isPublic !== undefined) updateData.isPublic = isPublic;
    if (slug !== undefined) updateData.slug = slug;
    if (targetRole !== undefined) updateData.targetRole = targetRole;
    if (resumeData !== undefined) {
      updateData.resumeData = typeof resumeData === 'string' ? resumeData : JSON.stringify(resumeData);
    }

    const updated = await prisma.resume.update({
      where: { id },
      data: updateData,
    });

    let returnData = resumeData;
    if (!returnData) {
      try {
        returnData = JSON.parse(updated.resumeData);
      } catch {
        returnData = {};
      }
    }

    return NextResponse.json({
      message: 'Resume updated successfully',
      resume: {
        ...updated,
        resumeData: returnData,
      },
    });
  } catch (error) {
    console.error('Error updating resume:', error);
    return NextResponse.json({ error: 'Failed to update resume' }, { status: 500 });
  }
}

export async function DELETE(
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
      return NextResponse.json({ error: 'Forbidden. You do not have permission to delete this resume.' }, { status: 403 });
    }

    await prisma.resume.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Error deleting resume:', error);
    return NextResponse.json({ error: 'Failed to delete resume' }, { status: 500 });
  }
}
