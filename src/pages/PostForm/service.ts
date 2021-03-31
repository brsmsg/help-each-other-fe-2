import { request } from 'umi';

export const postRequest = (params: any) => {
  const requestConfig = {
    method: 'POST',
    data: params,
  };
  return request('post/newPost', requestConfig);
};
