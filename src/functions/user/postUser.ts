import { getAuthToken } from '@/functions/getAuthToken';

export async function postUser() {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${process.env.URL}/api/user`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error(`ユーザー登録時のAPIで失敗: ${response.statusText}`);
    return response.json();
  } catch (error) {
    return error;
  }
}
