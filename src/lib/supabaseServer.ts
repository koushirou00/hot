// src/app/utils/supabaseServer.ts
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

/* 
サーバー側からの呼び出しのみ対応 (API(route.ts)やサーバーコンポーネント)
*/
export const supabaseServer = () => {
  const cookieStore = cookies();
  return createServerComponentClient({ cookies: () => cookieStore });
};
