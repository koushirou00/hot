// src / functions / getAuthToken.ts;
import { supabaseServer } from '@/lib/supabaseServer';

export async function getAuthToken() {
  try {
    const supabase = supabaseServer();
    const { data, error } = await supabase.auth.getSession();
    if (error) throw new Error(`tokenの取得に失敗しました: ${error?.message || '不明なエラー'}`);
    return data.session?.access_token;
  } catch (error) {
    throw error; //呼び出し元にエラーを返す
  }
}
