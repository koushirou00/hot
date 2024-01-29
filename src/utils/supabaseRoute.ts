// src/app/utils/supabaseRoute.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

/* 
API(route.ts)からの呼び出しのみ対応
*/
export const supabaseRoute = () => {
  const cookieStore = cookies();
  return createRouteHandlerClient({ cookies: () => cookieStore });
};
