/* eslint-disable react-hooks/rules-of-hooks */
import prisma from '@/lib/prisma';
import { supabase } from '@/app/utils/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    const { data, error } = await supabase.auth.getUser(token);
    if (error) return NextResponse.json({ error: 'トークン認証失敗', status: 401 });

    const user = await prisma.user.findUnique({
      where: {
        id: data.user.id
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    const { data: userData, error: authError } = await supabase.auth.getUser(token);
    if (authError || !userData) {
      return NextResponse.json({ error: '認証失敗', status: 401 });
    }
    const authUserId = userData.user.id;

    const existingUser = await prisma.user.findUnique({
      where: { id: authUserId }
    });

    if (!existingUser) {
      const newUser = await prisma.user.create({
        data: { id: authUserId }
      });
      return NextResponse.json(newUser);
    }

    return NextResponse;
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
