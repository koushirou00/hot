import { getAuthUser } from './supabaseServer';

/* 
検証できればUserテーブルから情報を返す
*/
export async function getUserProfile() {
  const authUser = await getAuthUser();
  const userId = authUser?.userData.id;
  const response = await fetch(`${process.env.URL}/api/user/${userId}`);
  if (!response.ok) throw new Error(`ユーザー情報更新のAPIで失敗しました: ${response}`);
  return response.json();
}
