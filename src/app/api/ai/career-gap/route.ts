import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { analyzeCareerGap, CAREER_BENCHMARKS } from '@/lib/careerBenchmarks';
import { careerGapSchema } from '@/lib/validation';

export async function GET() {
  // Returns available roles for career gap analysis
  const roles = Object.keys(CAREER_BENCHMARKS).map((key) => ({
    id: key,
    name: CAREER_BENCHMARKS[key].roleName,
    coreSkillsCount: CAREER_BENCHMARKS[key].coreSkills.length,
  }));
  return NextResponse.json({ roles });
}

export async function POST(req: NextRequest) {
  try {
    const session = getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Please login.' }, { status: 401 });
    }

    const body = await req.json();
    const parseResult = careerGapSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json({ error: parseResult.error.errors[0].message }, { status: 400 });
    }

    const { targetRole, resumeId, resumeData: directResumeData } = parseResult.data;

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

    const analysis = analyzeCareerGap(resumeData, targetRole);

    return NextResponse.json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error('Career gap error:', error);
    return NextResponse.json({ error: 'Failed to analyze career gap' }, { status: 500 });
  }
}
