import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/utils/supabase/getCurrentUser';

export async function GET(request: NextRequest) {
  try {
    const { data: user, error } = await getCurrentUser(request);
    if (error) return NextResponse.json({ error: 'トークン認証失敗', status: 401 });
    const getUser = await prisma.user.findUnique({
      where: {
        id: user.user.id
      }
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

export async function POST(request: NextRequest) {
  try {
    const { data: user, error } = await getCurrentUser(request);
    if (error) return NextResponse.json({ error: 'トークン認証失敗', status: 401 });

    const existingUser = await prisma.user.findUnique({
      where: {
        id: user.user.id
      }
    });

    if (!existingUser) {
      const newUser = await prisma.user.create({
        data: { id: user.user.id }
      });
      return NextResponse.json({ status: 200, newUser: newUser });
    }

    return NextResponse.json({
      error: 'すでに登録されているユーザーです',
      status: 403
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}

// プロフィール情報編集
export async function PATCH(request: NextRequest) {
  try {
    const { data: user, error } = await getCurrentUser(request);
    if (error) return NextResponse.json({ error: 'トークン認証失敗', status: 401 });

    const body = await request.json();

    const updateUser = await prisma.user.update({
      where: {
        id: user.user.id
      },
      data: {
        name: body.name,
        icon: body.iconPath,
        introduction: body.introduction,
        instagram: body.instagram,
        x: body.x,
        lock: body.lock
      }
    });

    if (!updateUser) return NextResponse.json({ error: 'ユーザーの更新に失敗しました。', status: 404 });
    return NextResponse.json({ status: 200, user: updateUser });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'サーバーエラーが発生しました。', status: 500 });
  }
}
