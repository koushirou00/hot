// src/app/api/follow/[id]/route.ts
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/utils/supabase/getCurrentUser';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { data: user, error } = await getCurrentUser(request);
    if (error) return NextResponse.json({ error: 'トークン認証失敗', status: 401 });

    const [follows, followers] = await Promise.all([
      prisma.follow.findMany({
        where: { userId: user.user.id },
        include: {
          followingUser: true //followingUserはスキーマで定義したrelation名
        }
      }),
      prisma.follow.findMany({
        where: { followingId: user.user.id },
        include: {
          user: true
        }
      })
    ]);

    return NextResponse.json({
      follows: follows,
      followers: followers,
      status: 200
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}
