// src/app/api/follow/[id]/route.ts
import prisma from '@/lib/prisma';
import { supabaseServer } from '@/lib/supabaseServer';
import { NextRequest, NextResponse } from 'next/server';

// export async function POST(request: NextRequest) {
//  try {
// const token = request.headers.get('Authorization')?.split(' ')[1];
// const supabase = supabaseServer();
// const { data: user, error } = await supabase.auth.getUser(token);
// if (error) return NextResponse.json({ error: 'トークン認証失敗', status: 401 });
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
