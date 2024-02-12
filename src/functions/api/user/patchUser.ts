// src/features/main/profile/edit/functions/patchUser.ts
import { supabaseClient } from '@/lib/supabaseClient';
import { UserEditData } from '@/types/userEditData';

export async function patchUserData(argData: UserEditData) {
  // クライアントコンポーネントからの呼び出し
  const { data, error } = await supabaseClient.auth.getSession();
  if (error) throw new Error('token取得に失敗');
  const token = data.session?.access_token;

  const response = await fetch(`/api/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      name: argData.name,
      iconPath: argData.iconUrl,
      introduction: argData.introduction,
      instagram: argData.instagram ? `https://www.instagram.com/${argData.instagram}` : '',
      x: argData.x ? `https://twitter.com/${argData.x}` : '',
      lock: argData.lock
    })
  });
  if (!response.ok) throw new Error(`ユーザー情報更新のAPIで失敗しました: ${response}`);
  return response.json();
}
