// src/functions/api/follow/fetchFollow.ts
import { getAuthToken } from '@/utils/supabase/getAuthToken';

export async function getFollow() {
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
