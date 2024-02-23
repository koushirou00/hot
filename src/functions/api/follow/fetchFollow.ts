// src/functions/api/follow/getFollow.ts
export async function fetchFollow(userId: string, cache: RequestCache = 'no-store') {
  try {
    const response = await fetch(`${process.env.URL}/api/follow/${userId}`, {
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
