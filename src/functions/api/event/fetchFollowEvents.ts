// src/functions/api/event/fetchFollowEvents.ts
export async function fetchFollowEvents(userId?: string, cache: RequestCache = 'no-store') {
  try {
    const fetchUrl = `${process.env.URL}/api/user/eventFollow/${userId ? userId : ''}`;
    const response = await fetch(fetchUrl, {
      headers: {
        'Content-Type': 'application/json'
      },
      cache: cache
    });
    if (!response.ok) throw new Error(`フォロー取得に失敗しました: ${response.statusText}`);

    return response.json();
  } catch (error) {
    return error;
  }
}
