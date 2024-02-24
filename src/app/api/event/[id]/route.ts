import prisma from '@/lib/prisma';
import { supabaseServer } from '@/lib/supabaseServer';
import { NextRequest, NextResponse } from 'next/server';

//イベント取得
export async function GET({ params }: { params: { id: string } }) {
  try {
    const eventId = params.id;

    const event = await prisma.event.findUnique({
      where: {
        id: eventId
      }
    });

    return NextResponse.json(event);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const eventId = params.id;
    const token = request.headers.get('Authorization')?.split(' ')[1];
    const supabase = supabaseServer();
    const { data: user, error } = await supabase.auth.getUser(token);
    if (error) return NextResponse.json({ error: 'トークン認証失敗', status: 401 });

    const dupliCheck = await prisma.eventFollower.findFirst({
      where: {
        userId: user.user.id,
        eventId: eventId
      }
    });
    if (!dupliCheck) throw new Error('すでにフォロー中のため実行不可です');

    const follow = await prisma.eventFollower.create({
      data: {
        userId: user.user.id,
        eventId: eventId
      }
    });
    return NextResponse.json(follow);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const eventId = params.id;
    const token = request.headers.get('Authorization')?.split(' ')[1];
    const supabase = supabaseServer();
    const { data: user, error } = await supabase.auth.getUser(token);
    if (error) return NextResponse.json({ error: 'トークン認証失敗', status: 401 });

    const targetRecord = await prisma.eventFollower.findFirst({
      where: {
        userId: user.user.id,
        eventId: eventId
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
