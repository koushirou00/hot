// src/app/utils/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest } from 'next/server';

export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
export const supabaseClient = createClientComponentClient(); //クライアントコンポーネントからの呼び出し

/** APIリクエストのtokenの検証。検証できればログインユーザー（Supabase）情報を返す */
export const getCurrentUser = async (request: NextRequest) => {
  const token = request.headers.get('Authorization')?.split(' ')[1];
  const { data, error } = await supabase.auth.getUser(token);

  return { currentUser: data.user, error };
};
