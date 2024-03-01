// src/app/api/follow/event/route.ts
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/utils/supabase/getCurrentUser';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { data: loginUser, error } = await getCurrentUser(request);
    if (!loginUser || error) return NextResponse.json({ error: 'トークン認証失敗', status: 401 });

    const body = await request.json();

    const newEventFollow = await prisma.eventFollower.create({
      data: {
        userId: loginUser.user.id,
        eventId: body.eventId
      }
    });

    return NextResponse.json({ newEventFollow: newEventFollow, status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}
