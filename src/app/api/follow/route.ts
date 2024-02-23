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

export async function POST(request: NextRequest) {
  try {
    const { data: loginUser, error } = await getCurrentUser(request);
    if (!loginUser || error) return NextResponse.json({ error: 'トークン認証失敗', status: 401 });

    const body = await request.json();

    const follows = await prisma.follow.create({
      data: {
        userId: loginUser.user.id,
        followingId: body.otherUserId,
        status: body.lock ? 'pending' : 'approved'
      }
    });

    return NextResponse.json({ follows: follows, status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { data: user, error } = await getCurrentUser(request);
    if (!user || error) return NextResponse.json({ error: 'トークン認証失敗', status: 401 });

    const body = await request.json();

    await prisma.follow.update({
      where: { id: body.recordId },
      data: { status: 'approved' }
    });

    return NextResponse.json({ message: 'success', status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}
