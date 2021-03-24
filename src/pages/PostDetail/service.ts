import { request } from 'umi';

export const postDetailRequest = async (params: { id: string }) => {
  const requestConfig = {
    method: 'GET',
    params,
  };
  return request(`post/${params.id}`, requestConfig);
};

export const authorStatRequest = async (params: { id: string }) => {
  const requestConfig = {
    method: 'GET',
    params,
  };
  return request(`users/userStat/${params.id}`, requestConfig);
};

export const participantsRequest = async (params: { id: string }) => {
  const requestConfig = {
    method: 'GET',
    params,
  };
};
