import { supabaseClient } from '@/lib/supabaseClient';
import useSWRImmutable from 'swr/immutable';

export function useUserId() {
  // supabaseのsessionからuserIdを取得する関数
  const fetcher = async () => {
    const response = await supabaseClient.auth.getSession();
    return response.data.session?.user.id;
  };

  const { data: userId, error } = useSWRImmutable('userId', fetcher);
  if (error) throw Error(`useUserId()でのエラー： ${error}`);

  // userIdを返す
  return userId;
}
