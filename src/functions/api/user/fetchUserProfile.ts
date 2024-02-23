// src/functions/fetchUserProfile.ts
import { getAuthToken } from '@/utils/supabase/getAuthToken';

export async function fetchUserProfile(isCache: RequestCache = 'no-store') {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${process.env.URL}/api/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      cache: isCache
    });
    if (!response.ok) throw new Error(`ユーザー情報の取得に失敗しました: ${response.statusText}`);
    return response.json();
  } catch (error) {
    return error;
  }
}
