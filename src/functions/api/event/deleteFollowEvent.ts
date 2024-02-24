// src/functions/api/event/deleteFollowEvent.ts
import { clientHeaderOption } from '../utils/clientHeaderOption';

export async function deleteFollowEvent(recordId: string) {
  try {
    const response = await fetch(`/api/event/follow/${recordId}`, {
      method: 'DELETE',
      headers: await clientHeaderOption()
    });
    if (!response.ok) throw new Error(`イベントのフォロー解除に失敗しました: ${response.statusText}`);

    return response.json();
  } catch (error) {
    return error;
  }
}
