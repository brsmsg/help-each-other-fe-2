import { request } from 'umi';

export const getPostRequest = (params: any) => {
  const requestConfig = {
    method: 'GET',
    params,
  };
  return request('post', requestConfig);
};

export const getTopUsers = () => {
  return request('users/topUsers');
};
