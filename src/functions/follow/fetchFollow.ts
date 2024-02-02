// src/functions/getUserProfile.ts
import { getAuthToken } from '@/functions/getAuthToken';

export async function fetchFollow() {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${process.env.URL}/api/follow`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error(`フォロー取得に失敗しました: ${response.statusText}`);
    return response.json();
  } catch (error) {
    return error;
  }
}
