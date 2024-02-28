// src/functions/api/utils/clientHeaderOption.ts
import { supabaseClient } from '@/lib/supabaseClient';

type HeaderOption = {
  'Content-Type': 'application/json';
  Authorization?: string;
};

// クライアントコンポーネントからの呼び出し;
export const clientHeaderOption = async (): Promise<HeaderOption> => {
  /* --- Authrization追加 --- */
  const { data, error } = await supabaseClient.auth.getSession();
  if (error) throw new Error('token取得に失敗');
  const token = data.session?.access_token;
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  };
};
