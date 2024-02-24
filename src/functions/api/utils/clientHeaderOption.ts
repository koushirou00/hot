// src/functions/api/utils/clientHeaderOption.ts
import { supabaseClient } from '@/lib/supabaseClient';

type args = {
  otherUser?: boolean;
};
type HeaderOption = {
  'Content-Type': 'application/json';
  Authorization?: string;
};
// クライアントコンポーネントからの呼び出し;
export const clientHeaderOption = async ({ otherUser = false }: args = {}): Promise<HeaderOption> => {
  const defaultHeader: HeaderOption = {
    'Content-Type': 'application/json'
  };
  if (otherUser) return defaultHeader;

  /* --- ログインユーザーのみ Authrization追加 --- */
  const { data, error } = await supabaseClient.auth.getSession();
  if (error) throw new Error('token取得に失敗');
  const token = data.session?.access_token;
  return {
    ...defaultHeader,
    Authorization: `Bearer ${token}`
  };
};
