import { serverHeaderOption } from '../utils/serverHeaderOption';

// src/functions/api/event/fetchFollowEvents.ts
export async function fetchFollowEvents(otherUserId?: string, cache: RequestCache = 'no-store') {
  try {
    const fetchUrl = `${process.env.URL}/api/event/follow/${otherUserId ? otherUserId : ''}`;
    const response = await fetch(fetchUrl, {
      headers: await serverHeaderOption({ otherUser: Boolean(otherUserId) }),
      cache: cache
    });
    if (!response.ok) throw new Error(`フォロー取得に失敗しました: ${response.statusText}`);

    return response.json();
  } catch (error) {
    return error;
  }
}
