export type HttpRequestOptionsType = {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  getUrl: () => string;
  getBody: () => object;
};
export type HttpRequestOptionsForSuccessType = {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  getUrl: () => string;
  getBodies: {
    getBody: () => object;
    getDescribeString: (role: string) => string;
  }[];
};
