// src/functions/api/event/newFollowEvent.ts
import { clientHeaderOption } from '../utils/clientHeaderOption';

export async function newFollowEvent(eventId: string) {
  try {
    const response = await fetch(`/api/event/follow`, {
      method: 'POST',
      headers: await clientHeaderOption(),
      body: JSON.stringify({
        eventId
      })
    });
    if (!response.ok) throw new Error(`イベントのフォローに失敗しました: ${response.statusText}`);
    return response.json();
  } catch (error) {
    return error;
  }
}
