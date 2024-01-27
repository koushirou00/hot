// src/app/utils/supabaseServer.ts
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

/* 
サーバー側からの呼び出しのみ対応 (API(route.ts)やサーバーコンポーネント)
*/
const supabaseServer = () => {
  const cookieStore = cookies();
  return createServerComponentClient({ cookies: () => cookieStore });
};

/* 
検証できればログインユーザー（Supabase）情報を返す
*/
export const getAuthUser = async () => {
  const supabase = supabaseServer();
  const { data: user, error } = await supabase.auth.getUser();

  if (error || !user.user) {
    console.error('supabaseGetUserでエラー :', error);
    return null;
  }
  const userData = user.user;
  return { userData };
};
