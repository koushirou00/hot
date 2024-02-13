import { supabaseClient } from '@/lib/supabaseClient';

export async function approveFollow(recordId: string) {
  try {
    // クライアントコンポーネントからの呼び出し
    const { data, error } = await supabaseClient.auth.getSession();
    if (error) throw new Error('token取得に失敗');
    const token = data.session?.access_token;
    const response = await fetch(`/api/follow`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        recordId: recordId
      })
    });
    if (!response.ok) throw new Error(`フォロワーの承認に失敗しました: ${response.statusText}`);

    return response.json();
  } catch (error) {
    return error;
  }
}
