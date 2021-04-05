import { request } from 'umi';

export const getPostRequest = (params: any) => {
  const requestConfig = {
    method: 'GET',
    params,
  };
  return request('post', requestConfig);
};
