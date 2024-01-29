import prisma from '@/lib/prisma';
import { getAuthUser } from '@/functions/route/getAuthUser';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await getAuthUser();
    const userId = data?.userData.id;
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

export async function POST() {
  try {
    const data = await getAuthUser();
    if (!data) return NextResponse.json({ status: 401, error: 'ユーザーデータの取得に失敗' });
    const userId = data?.userData.id;
    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!existingUser) {
      const newUser = await prisma.user.create({
        data: { id: userId }
      });
      return NextResponse.json({ status: 200, newUser: newUser });
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
//     const data = await getAuthUser();
//     const userId = data?.userData.id;
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
