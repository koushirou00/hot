import { supabaseClient } from '@/lib/supabaseClient';

export async function newFollow(otherUserId: string, lock: boolean = false) {
  try {
    // クライアントコンポーネントからの呼び出し
    const { data, error } = await supabaseClient.auth.getSession();
    if (error) throw new Error('token取得に失敗');
    const token = data.session?.access_token;
    const response = await fetch(`/api/follow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        otherUserId,
        lock
      })
    });
    if (!response.ok) throw new Error(`フォロワーの承認に失敗しました: ${response.statusText}`);

    return response.json();
  } catch (error) {
    return error;
  }
}
