import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const session = getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden. Admin privileges required.' }, { status: 403 });
    }

    const [totalUsers, totalResumes, publicPortfolios, templateCounts, recentUsers, recentResumes] = await Promise.all([
      prisma.user.count(),
      prisma.resume.count(),
      prisma.resume.count({ where: { isPublic: true } }),
      prisma.resume.groupBy({
        by: ['templateId'],
        _count: { templateId: true },
      }),
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { id: true, name: true, email: true, role: true, createdAt: true },
      }),
      prisma.resume.findMany({
        take: 5,
        orderBy: { updatedAt: 'desc' },
        select: {
          id: true,
          title: true,
          templateId: true,
          isPublic: true,
          updatedAt: true,
          user: {
            select: { name: true, email: true },
          },
        },
      }),
    ]);

    const templates = templateCounts.map((t) => ({
      templateId: t.templateId,
      count: t._count.templateId,
    }));

    return NextResponse.json({
      totalUsers,
      totalResumes,
      publicPortfolios,
      templates,
      recentUsers,
      recentResumes,
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch admin stats' }, { status: 500 });
  }
}
