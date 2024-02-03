import { supabaseServer } from '@/lib/supabaseServer';
import { NextRequest } from 'next/server';

/* tokenが検証できればuser情報を返す */
export const getCurrentUser = async (request: NextRequest) => {
  const supabase = supabaseServer(); //シングルトンではない為呼び出し毎に要インスタンス化
  const token = request.headers.get('Authorization')?.split(' ')[1];
  return await supabase.auth.getUser(token);
};
