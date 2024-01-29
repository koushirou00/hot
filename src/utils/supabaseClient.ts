// src/app/utils/supabaseClient.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

//クライアントコンポーネントからの呼び出しのみ可能
//重複を避けてここでインスタンス化（シングルトン）
export const supabaseClient = createClientComponentClient();
