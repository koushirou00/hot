// src/app/api/posts/[id]/route.ts
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// つぶやき一覧取得
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = params.id;

    const posts = await prisma.post.findMany({
      where: { userId: userId },
      include: {
        user: true,
        event: true,
        comment: true,
        like: true,
        retweet: true,
        bad: true
      }
    });

    return NextResponse.json({ posts: posts, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
