import { SendRequest } from './types/sendRequest';
import { createEndpoint } from './utils/createEndpoint';
import { serverHeaderOption } from './utils/serverHeaderOption';

export function serverApi() {
  const sendRequest = async ({ url, method, body, authorization = false, cache = 'no-store' }: SendRequest) => {
    const headers = await serverHeaderOption({ authorization: authorization });

    const options = {
      method: method,
      headers: headers,
      cache: cache,
      ...(body && { body: JSON.stringify(body) })
    };

    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`APIレスポンスエラー: ${response.status}`);
    return await response.json();
  };

  const endpoint = createEndpoint('server');

  return {
    /* ユーザー */
    getLoginUser: (cache?: RequestCache) => sendRequest({ url: endpoint.user, method: 'GET', authorization: true, cache: cache }),
    getOtherUser: (otherUserId: string) => sendRequest({ url: endpoint.getOtherUser(otherUserId), method: 'GET' }),
    postUser: () => sendRequest({ url: endpoint.user, method: 'POST', authorization: true }),

    /* フォロー */
    getFollow: (userId: string) => sendRequest({ url: endpoint.followWithId(userId), method: 'GET' }),
    /* イベント */
    getFollowEvent: (userId: string) => sendRequest({ url: endpoint.followEventWithId(userId), method: 'GET' }),
    /* つぶやき */
    getPosts: (userId: string) => sendRequest({ url: endpoint.postWithId(userId), method: 'GET' })
  };
}
