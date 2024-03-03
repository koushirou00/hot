export type SendRequest = {
  url: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: any;
  authorization?: boolean;
  cache?: RequestCache;
};
