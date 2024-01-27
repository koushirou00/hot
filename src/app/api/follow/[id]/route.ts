// src/app/api/follow/[id]/route.ts
import prisma from '@/utils/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.pathname.split('/').pop();

    const [follows, followers] = await Promise.all([
      prisma.follow.findMany({
        where: { userId: userId },
        include: {
          followingUser: true //followingUserはスキーマで定義したrelation名
        }
      }),
      prisma.follow.findMany({
        where: { followingId: userId },
        include: {
          user: true
        }
      })
    ]);

    return NextResponse.json({
      follows: follows,
      followers: followers,
      status: 200
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}

// export async function POST(request: NextRequest) {
//   console.log(request);
//   try {
//     const userId = request.nextUrl.pathname.split('/').pop();
//     const follows = await prisma.follow.findMany({
//       where: {
//         userId: userId
//       }
//     });

//     console.log(follows);

// return NextResponse.json({ follows: follows, status: 200 });
//   } catch (error) {
//     return NextResponse.json(error);
//   }
// }
