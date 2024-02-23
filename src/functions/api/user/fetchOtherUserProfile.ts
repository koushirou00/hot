// src/functions/fetchUserProfile.ts
import { createHeaderOption } from '@/functions/api/utils/createHeaderOption';

export async function fetchUserProfile(userId: string, isCache: RequestCache = 'no-cache') {
  try {
    const fetchUrl = `${process.env.URL}/api/user/${userId ? userId : ''}`;

    const response = await fetch(fetchUrl, {
      method: 'GET',
      headers: await createHeaderOption(!!userId),
      cache: isCache
    });

    if (!response.ok) throw new Error(`ユーザー情報の取得に失敗しました: ${response.statusText}`);
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
