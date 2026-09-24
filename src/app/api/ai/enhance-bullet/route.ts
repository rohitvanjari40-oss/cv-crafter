import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@/lib/auth';
import { enhanceBulletPoint } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const session = getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Please login.' }, { status: 401 });
    }

    const body = await req.json();
    const { bullet, role } = body;

    if (!bullet || typeof bullet !== 'string') {
      return NextResponse.json({ error: 'Bullet text is required' }, { status: 400 });
    }

    const enhanced = await enhanceBulletPoint(bullet, role);

    return NextResponse.json({ enhanced });
  } catch (error) {
    console.error('Bullet enhance error:', error);
    return NextResponse.json({ error: 'Failed to enhance bullet point' }, { status: 500 });
  }
}
