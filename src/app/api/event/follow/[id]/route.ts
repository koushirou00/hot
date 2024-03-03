import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/utils/supabase/getCurrentUser';
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
      },
      orderBy: {
        event: {
          eventDate: 'asc'
        }
      }
    });
    return NextResponse.json({ followEventArray: events, status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { data: user, error } = await getCurrentUser(request);
    if (!user || error) return NextResponse.json({ error: 'トークン認証失敗', status: 401 });

    const recordId = params.id;
    await prisma.eventFollower.delete({
      where: {
        id: recordId
      }
    });

    return NextResponse.json({ message: 'success', status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}
