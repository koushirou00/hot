// src/functions/api/user/fetchUserProfile.ts
import { serverHeaderOption } from '@/functions/api/utils/serverHeaderOption';

export async function fetchUserProfile(otherUserId?: string, isCache: RequestCache = 'no-cache') {
  try {
    const fetchUrl = `${process.env.URL}/api/user/${otherUserId ? otherUserId : ''}`;
    const response = await fetch(fetchUrl, {
      method: 'GET',
      headers: await serverHeaderOption({ otherUser: Boolean(otherUserId) }),
      cache: isCache
    });

    if (!response.ok) throw new Error(`ユーザー情報の取得に失敗しました: ${response.statusText}`);
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
