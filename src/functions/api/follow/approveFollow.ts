// src/functions/api/follow/approveFollow.ts
import { clientHeaderOption } from '../utils/clientHeaderOption';

export async function approveFollow(recordId: string) {
  try {
    const response = await fetch(`/api/follow`, {
      method: 'PATCH',
      headers: await clientHeaderOption(),
      body: JSON.stringify({
        recordId: recordId
      })
    });
    if (!response.ok) throw new Error(`フォロワーの承認に失敗しました: ${response.statusText}`);

    return response.json();
  } catch (error) {
    return error;
  }
}
