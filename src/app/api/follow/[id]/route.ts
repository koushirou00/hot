// src/app/api/follow/[id]/route.ts
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/utils/supabase/getCurrentUser';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { data: user, error } = await getCurrentUser(request);
    if (!user || error) return NextResponse.json({ error: 'トークン認証失敗', status: 401 });

    const targetUserId = request.nextUrl.pathname.split('/').pop();
    const follows = await prisma.follow.findMany({
      where: {
        userId: targetUserId
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

    const recordId = request.nextUrl.pathname.split('/').pop();
    const record = await prisma.follow.update({
      where: { id: recordId },
      data: { status: 'approved' }
    });

    console.log(record);
    return NextResponse.json({ message: 'success', status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { data: user, error } = await getCurrentUser(request);
    if (!user || error) return NextResponse.json({ error: 'トークン認証失敗', status: 401 });

    const recordId = request.nextUrl.pathname.split('/').pop();
    const record = await prisma.follow.delete({
      where: {
        id: recordId
      }
    });

    console.log(record);
    return NextResponse.json({ message: 'success', status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}
