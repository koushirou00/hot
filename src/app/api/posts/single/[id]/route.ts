import prisma from '@/lib/prisma';
import { supabaseServer } from '@/lib/supabaseServer';
import { NextRequest, NextResponse } from 'next/server';

//つぶやき単体で取得
export async function GET({ params }: { params: { id: string } }) {
  try {
    const postId = params.id;

    const post = await prisma.post.findUnique({
      where: {
        id: postId
      }
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
