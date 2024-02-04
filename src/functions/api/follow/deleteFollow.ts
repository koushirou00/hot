import { supabaseClient } from '@/lib/supabaseClient';

export async function deleteFollow(recordId: string) {
  try {
    // クライアントコンポーネントからの呼び出し
    const { data, error } = await supabaseClient.auth.getSession();
    if (error) throw new Error('token取得に失敗');
    const token = data.session?.access_token;
    const response = await fetch(`/api/follow/${recordId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error(`フォロー削除に失敗しました: ${response.statusText}`);

    return response.json();
  } catch (error) {
    return error;
  }
}
