import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// ユーザーがフォロー中のイベント
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = params.id;
    if (!userId) return NextResponse.json({ error: 'userIdを取得できませんでした', status: 401 });

    const events = await prisma.eventFollower.findMany({
      where: { userId: userId },
      include: {
        event: {
          include: {
            prefecture: true
          }
        }
      }
    });

    return NextResponse.json({ followEventsArray: events, status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}
