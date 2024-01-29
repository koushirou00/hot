import { supabaseServer } from '@/utils/supabaseServer';

/* 
API（route.ts）からの呼び出し専用
検証できればログインユーザー（Supabase）情報を返す
*/
export const getAuthUser = async () => {
  const supabase = supabaseServer();
  const { data: user, error } = await supabase.auth.getUser();

  if (error || !user.user) {
    console.error('getAuthUser()でエラー :', error);
    return null;
  }
  const userData = user.user;
  return { userData };
};
