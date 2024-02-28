// src/app/api/follow/[id]/route.ts
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/utils/supabase/getCurrentUser';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const OtherUserId = params.id;
    if (!OtherUserId) return NextResponse.json({ error: 'userIdを取得できませんでした', status: 401 });

    const [follows, followers] = await Promise.all([
      prisma.follow.findMany({
        where: { userId: OtherUserId },
        include: {
          followingUser: true //followingUserはスキーマで定義したrelation名
        },
        orderBy: {
          status: 'desc' // pendingが上に来るようにする。（'desc' は降順 ）
        }
      }),
      prisma.follow.findMany({
        where: { followingId: OtherUserId },
        include: {
          user: true
        },
        orderBy: {
          status: 'desc' // pendingが上に来るようにする。（'desc' は降順 ）
        }
      })
    ]);

    return NextResponse.json({
      followArray: {
        follows: follows,
        followers: followers
      },
      status: 200
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { data: user, error } = await getCurrentUser(request);
    if (!user || error) return NextResponse.json({ error: 'トークン認証失敗', status: 401 });

    const recordId = params.id;
    await prisma.follow.delete({
      where: {
        id: recordId
      }
    });

    return NextResponse.json({ message: 'success', status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}
