import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { analyzeJobMatch } from '@/lib/jobMatcher';
import { jobMatchSchema } from '@/lib/validation';

export async function POST(req: NextRequest) {
  try {
    const session = getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Please login.' }, { status: 401 });
    }

    const body = await req.json();
    const parseResult = jobMatchSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json({ error: parseResult.error.errors[0].message }, { status: 400 });
    }

    const { jobDescription, resumeId, resumeData: directResumeData } = parseResult.data;

    let resumeData = directResumeData;

    if (resumeId) {
      const resume = await prisma.resume.findUnique({
        where: { id: resumeId },
      });

      if (!resume) {
        return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
      }

      if (resume.userId !== session.id && session.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }

      try {
        resumeData = JSON.parse(resume.resumeData);
      } catch {
        resumeData = null;
      }
    }

    if (!resumeData) {
      return NextResponse.json({ error: 'Valid resume data is required' }, { status: 400 });
    }

    const matchAnalysis = analyzeJobMatch(resumeData, jobDescription);

    return NextResponse.json({
      success: true,
      analysis: matchAnalysis,
    });
  } catch (error) {
    console.error('Job match error:', error);
    return NextResponse.json({ error: 'Failed to analyze job match' }, { status: 500 });
  }
}
