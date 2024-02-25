import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// つぶやき一覧取得
export async function GET({ params }: { params: { id: string } }) {
  try {
    const userId = params.id;

    const posts = await prisma.post.findMany({
      where: { id: userId },
      include: {
        user: true
      }
    });

    return NextResponse.json({ posts: posts, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
