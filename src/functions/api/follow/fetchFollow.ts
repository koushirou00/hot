import { serverHeaderOption } from '../utils/serverHeaderOption';

// src/functions/api/follow/getFollow.ts
export async function fetchFollow(otherUserId?: string, cache: RequestCache = 'no-store') {
  try {
    const response = await fetch(`${process.env.URL}/api/follow/${otherUserId ? otherUserId : ''}`, {
      headers: await serverHeaderOption({ otherUser: Boolean(otherUserId) }),
      cache: cache
    });
    if (!response.ok) throw new Error(`フォロー取得に失敗しました: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    return error;
  }
}
