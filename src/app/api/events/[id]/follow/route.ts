import prisma from '@/utils/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse, { params }: { params: { id: string } }) {
  try {
    const eventId = params.id;
    const userId = await req.json();
    // userIdをリクエストボディに含められなかった時はUserモデルから検索必要
    // const user = await prisma.user.findUnique({
    //   where: {
    //     id: userData.name
    //   }
    // });

    const dupliCheck = await prisma.eventFollower.findFirst({
      where: {
        user_id: userId,
        event_id: eventId
      }
    });
    if (!dupliCheck) throw new Error('すでにフォロー中のため実行不可です');

    const follow = await prisma.eventFollower.create({
      data: {
        user_id: userId,
        event_id: eventId
      }
    });
    return NextResponse.json(follow);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function DELETE(req: NextRequest, res: NextResponse, { params }: { params: { id: string } }) {
  try {
    const eventId = params.id;
    const userId = await req.json();

    // userIdをリクエストボディに含められなかった時はUserモデルから検索必要
    // const user = await prisma.user.findUnique({
    //   where: {
    //     id: userData.name
    //   }
    // });

    const targetRecord = await prisma.eventFollower.findFirst({
      where: {
        user_id: userId,
        event_id: eventId
      }
    });

    const followDelete = await prisma.eventFollower.delete({
      where: {
        id: targetRecord?.id
      }
    });

    return NextResponse.json(followDelete);
  } catch (error) {
    return NextResponse.json(error);
  }
}
