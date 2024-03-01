export const createEndpoint = (runtime: 'server' | 'client') => {
  const apiBase = runtime === 'server' ? `${process.env.URL}/api` : '/api';
  //エンドポイントを返却
  return {
    user: `${apiBase}/user/`,
    getOtherUser: (id: string) => `${apiBase}/user/${id}`, // 他者ユーザーのID
    follow: `${apiBase}/follow`,
    followWithId: (id: string) => `${apiBase}/follow/${id}`,
    followEvent: `${apiBase}/event/follow`,
    followEventWithId: (id: string) => `${apiBase}/event/follow/${id}`, // eventId
    postWithId: (id: string) => `${apiBase}/posts/${id}`
  };
};
