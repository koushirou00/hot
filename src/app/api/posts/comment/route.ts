import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/utils/supabase/getCurrentUser';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { data: loginUser, error } = await getCurrentUser(request);
    if (!loginUser || error) return NextResponse.json({ error: 'トークン認証失敗', status: 401 });

    const body = await request.json();
    const addComment = await prisma.comment.create({
      data: {
        userId: body.userId,
        postId: body.postId,
        text: body.text,
        parentId: body.parentid || null
      }
    });

    return NextResponse.json({ comment: addComment, status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}
