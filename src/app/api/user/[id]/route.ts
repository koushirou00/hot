// src/app/api/user/[id]/route.ts
import prisma from '@/utils/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.pathname.split('/').pop();
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!user) {
      return NextResponse.json({
        error: 'ユーザーが存在しません',
        status: 403
      });
    }

    return NextResponse.json({ user: user, status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.nextUrl.pathname.split('/').pop();
    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!existingUser) {
      const newUser = await prisma.user.create({
        data: { id: userId }
      });
      return NextResponse.json(newUser);
    }

    return NextResponse.json({
      error: 'すでに登録されているユーザーです',
      status: 403
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

// プロフィール情報編集用_未実装
// export async function PATCH(request: NextRequest) {
//   try {
//     const token = request.headers.get('Authorization')?.split(' ')[1];
//     const { data, error } = await supabase.auth.getUser(token);
//     if (error) return NextResponse.json({ error: '認証失敗', status: 401 });

//     const body = await request.json()

//     const user = await prisma.user.upsert({
//       where: {
//         id: data.user.id;
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
