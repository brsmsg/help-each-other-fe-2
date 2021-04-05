import { request } from 'umi';

export const getUserInfo = (params: any) => {
  const requestConfig = {
    method: 'GET',
    params,
  };
  return request('user/userStat', requestConfig);
};
