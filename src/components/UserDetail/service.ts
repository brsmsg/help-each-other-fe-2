import { request } from 'umi';

export const getUserStat = (params: any) => {
  const { id } = params;
  const requestConfig = {
    method: 'GET',
  };
  return request(`users/userStat/${id}`, requestConfig);
};

export const getUserInfo = (id: string) => {
  return request(`users/userInfo/${id}`);
};
