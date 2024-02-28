// src/app/api/posts/route.ts
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/utils/supabase/getCurrentUser';
import { NextRequest, NextResponse } from 'next/server';

//POSTメソッドをかく。
//フォロー中のイベントのみ対象のGETメソッドをかく。
