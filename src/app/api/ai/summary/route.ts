import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@/lib/auth';
import { generateProfessionalSummary } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const session = getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Please login.' }, { status: 401 });
    }

    const body = await req.json();
    const { jobTitle, experienceLevel = 'fresher', keySkills = [] } = body;

    const result = await generateProfessionalSummary(jobTitle || 'Software Engineer', experienceLevel, keySkills);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Summary generator error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to generate summary' }, { status: 500 });
  }
}
