// src/functions/getUserProfile.ts
import { getAuthToken } from '@/utils/supabase/getAuthToken';

export async function fetchUserProfile() {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${process.env.URL}/api/user`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error(`ユーザー情報の取得に失敗しました: ${response.statusText}`);
    return response.json();
  } catch (error) {
    return error;
  }
}
