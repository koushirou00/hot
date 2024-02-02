// src/app/api/follow/[id]/route.ts
import prisma from '@/lib/prisma';
import { supabaseServer } from '@/lib/supabaseServer';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    const supabase = supabaseServer();
    const { data: user, error } = await supabase.auth.getUser(token);
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
