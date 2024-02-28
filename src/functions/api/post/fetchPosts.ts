// src/functions/api/post/fetchPosts.ts
import { serverHeaderOption } from '../utils/serverHeaderOption';

export async function fetchPosts(userId?: string, cache: RequestCache = 'no-store') {
  try {
    const fetchUrl = `${process.env.URL}/api/posts/${userId}`;
    const response = await fetch(fetchUrl, {
      headers: await serverHeaderOption({ otherUser: Boolean(userId) }),
      cache: cache
    });
    if (!response.ok) throw new Error(`フォロー取得に失敗しました: ${response.statusText}`);

    return response.json();
  } catch (error) {
    return error;
  }
}
