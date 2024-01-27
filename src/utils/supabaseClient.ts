// src/app/utils/supabaseClient.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

//クライアントコンポーネントからの呼び出しのみ可能
//重複を避けてここでインスタンス化し一元管理。
export const supabaseClient = createClientComponentClient();
