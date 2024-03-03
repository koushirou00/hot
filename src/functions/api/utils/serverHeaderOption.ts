// src/functions/api/utils/serverHeaderOption.ts
import { getAuthToken } from '@/utils/supabase/getAuthToken';

type args = {
  authorization?: boolean;
};
type HeaderOption = {
  'Content-Type': 'application/json';
  Authorization?: string;
};

// サーバーコンポーネントからの呼び出し
export const serverHeaderOption = async ({ authorization = false }: args = {}): Promise<HeaderOption> => {
  const defaultHeader: HeaderOption = {
    'Content-Type': 'application/json'
  };
  if (!authorization) return defaultHeader;

  /* --- ログインユーザーのみ Authrization追加 --- */
  const token = await getAuthToken();
  return {
    ...defaultHeader,
    Authorization: `Bearer ${token}`
  };
};
