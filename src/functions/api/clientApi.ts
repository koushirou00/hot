import { SendRequest } from './types/sendRequest';
import { UserEditData } from '@/types/userEditData';
import { createEndpoint } from './utils/createEndpoint';
import { clientHeaderOption } from '@/functions/api/utils/clientHeaderOption';

export function clientApi() {
  const sendRequest = async ({ url, method, body }: SendRequest) => {
    const headers = await clientHeaderOption();

    const options = {
      method: method,
      headers: headers,
      ...(body && { body: JSON.stringify(body) })
    };

    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`APIレスポンスエラー: ${response.status}`);
    return await response.json();
  };

  const endpoint = createEndpoint('client');
  return {
    /* ユーザー */
    patchUser: (body: UserEditData) => sendRequest({ url: endpoint.user, method: 'PATCH', body }),

    /* フォロー */
    postFollow: (otherUserId: string) => sendRequest({ url: endpoint.follow, method: 'POST', body: otherUserId }),
    postLockFollow: (otherUserId: string) => sendRequest({ url: endpoint.follow, method: 'POST', body: { otherUserId, lock: true } }),
    approveFollow: (recordId: string) => sendRequest({ url: endpoint.follow, method: 'PATCH', body: recordId }),
    deleteFollow: (recordId: string) => sendRequest({ url: endpoint.followWithId(recordId), method: 'DELETE' }),

    /* イベント */
    postFollowEvent: (eventId: string) => sendRequest({ url: endpoint.followEvent, method: 'POST', body: eventId }),
    deleteFollowEvent: (recorId: string) => sendRequest({ url: endpoint.followEventWithId(recorId), method: 'DELETE' })

    /* つぶやき */
  };
}
