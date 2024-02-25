// src/app/api/posts/route.ts
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/utils/supabase/getCurrentUser';
import { NextRequest, NextResponse } from 'next/server';

//
export async function GET(request: NextRequest) {
  try {
    const { data: user, error } = await getCurrentUser(request);
    if (error) return NextResponse.json({ error: 'トークン認証失敗', status: 401 });
    const userId = user.user.id;

    const posts = await prisma.post.findMany({
      where: { userId: userId },
      include: {
        user: true,
        event: true
      }
    });

    return NextResponse.json({ posts: posts, status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}
