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
      }
    });

    /*
    【日付の並び替え】
    aとbで配列内を順番位比較していく
      戻り値が正の数： a を b の後に並べる
      戻り値が負の数： a を b の前に並べる
      ※ bの方が現在日に近い場合のみbを前に持ってくる。
    */
    // 例）a = 2022/04/01,  b = 2022/03/01 の場合、 a - b = 正数のためaがbの後ろへ行く。
    events.sort((a, b) => new Date(a.event.eventDate).getTime() - new Date(b.event.eventDate).getTime());
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
