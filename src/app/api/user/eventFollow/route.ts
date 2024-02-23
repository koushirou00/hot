import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/utils/supabase/getCurrentUser';
import { NextRequest, NextResponse } from 'next/server';

// ログインユーザーがフォロー中のイベント
export async function GET(request: NextRequest) {
  try {
    const { data: user, error } = await getCurrentUser(request);
    if (error) return NextResponse.json({ error: 'トークン認証失敗', status: 401 });
    const userId = user.user.id;

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
