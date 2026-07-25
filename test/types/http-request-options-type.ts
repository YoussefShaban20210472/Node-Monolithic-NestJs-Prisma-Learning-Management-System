export type HttpRequestOptionsType = {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  getUrl: () => string;
  getBody: () => object;
  getDescribeString?: (role: string) => string;
};
