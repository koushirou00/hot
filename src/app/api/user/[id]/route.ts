import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// ユーザーの情報取得
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = params.id;
    if (!userId) return NextResponse.json({ error: 'userIdを取得できませんでした', status: 401 });

    const getUser = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!getUser) {
      return NextResponse.json({
        error: 'ユーザーが存在しません',
        status: 403
      });
    }
    // キャッシュ対策
    if (getUser.icon?.includes('supabase')) getUser.icon = `${getUser.icon}?updatedAt=${Date.now()}`;

    return NextResponse.json({ user: getUser, status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}
