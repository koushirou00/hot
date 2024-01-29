// src/functions/Route/getAuthUser.ts
import { supabaseRoute } from '@/utils/supabaseRoute';

/* 
サーバーコンポーネントからの呼び出し専用
検証できればログインユーザー（Supabase）情報を返す
*/
export const getAuthUser = async () => {
  const supabase = supabaseRoute();
  const { data: user, error } = await supabase.auth.getUser();

  if (error || !user.user) {
    console.error('functions/Route/getAuthUser.tsのgetAuthUser()でエラー\n', error);
    return null;
  }
  const userData = user.user;
  return { userData };
};
