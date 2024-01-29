/* 
検証できればUserテーブルから情報を返す
*/
export async function getUserProfile() {
  const response = await fetch(`${process.env.URL}/api/user`);
  if (!response.ok) throw new Error(`ユーザー情報更新のAPIで失敗しました: ${response}`);
  return response.json();
}
