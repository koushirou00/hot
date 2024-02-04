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

// プロフィール情報編集用_未実装
// export async function PATCH(request: NextRequest) {
//   try {
// const { data: user, error } = await getCurrentUser(request);
// if (error) return NextResponse.json({ error: 'トークン認証失敗', status: 401 });
//     const body = await request.json()

//     const user = await prisma.user.upsert({
//       where: {
//         id: userId;
//       }
//       update: {
//         name: body.name?,
//         icon:  body.icon?,
//         introduction: body.introduction?,
//         instagram: body.instagram?,
//         x: body.x?,
//         lock: body.lock?,
//       },
//     });
//     // console.log(user);

//     return NextResponse.json(user);
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(error);
//   }
// }
