// src/app/api/follow/[id]/route.ts
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/utils/supabase/getCurrentUser';
import { NextRequest, NextResponse } from 'next/server';

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
