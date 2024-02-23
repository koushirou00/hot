import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// 他者ユーザーの情報
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const otherUserId = params.id;
    if (!otherUserId) return NextResponse.json({ error: 'userIdを取得できませんでした', status: 401 });

    const getUser = await prisma.user.findUnique({
      where: { id: otherUserId }
    });

    if (!getUser) {
      return NextResponse.json({
        error: 'ユーザーが存在しません',
        status: 403
      });
    }
    // キャッシュ対策
    if (getUser.icon?.includes('supabase')) getUser.icon = `${getUser.icon}?updatedAt=${Date.now()}`;

    return NextResponse.json({ otherUser: getUser, status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}
